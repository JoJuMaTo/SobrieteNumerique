<?php

namespace App\Controller;

use App\Entity\User;
use App\Security\TokenExtractor;
use App\Service\TokenProvider;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\Exception\ORMException;
use Doctrine\ORM\OptimisticLockException;
use Random\RandomException;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Exception\JsonException;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Attribute\Route;

class AuthController extends AbstractController
{
    #[Route('/user/register', name: 'api_auth_register_user', methods: ['POST'])]
    public function userRegister(Request $request, UserPasswordHasherInterface $passwordHasher, EntityManagerInterface $entityManager): JsonResponse
    {
        try {
            $data = json_decode($request->getContent(), true, 512, JSON_THROW_ON_ERROR);
        } catch (JsonException $e) {
            return new JsonResponse(['error' => 'Invalid JSON: ' . $e->getMessage()], Response::HTTP_BAD_REQUEST);
        }

        $username = $data['username'];
        $password = $data['password'];
        //$username = $request->request->get('username');
        //$password = $request->request->get('password');
        $user = new User();
        $user->setUsername($username);
        $hashedPassword = $passwordHasher->hashPassword($user, $password);
        $user->setPassword($hashedPassword);
        $entityManager->persist($user);
        $entityManager->flush();
        $boo = $passwordHasher->isPasswordValid($user, $password) ? 'true' : 'false';
        $message = 'User ' . $user->getUsername() . ' created successfully : resp ' . $boo;
        return $this->json([
            'message' => $message,

        ]);
    }

    /**
     * @throws RandomException
     */
    #[Route('/user/login', name: 'api_auth_login_user', methods: ['POST'])]
    public function userLogin(Request $request, EntityManagerInterface $entityManager, UserPasswordHasherInterface $passwordHasher, TokenProvider $tokenProvider): Response
    {
        //For Json handling
        /*try {
            $data = json_decode($request->getContent(), true, 512, JSON_THROW_ON_ERROR);
        } catch (JsonException $e) {
            return new JsonResponse(['error' => 'Invalid JSON: ' . $e->getMessage()], Response::HTTP_BAD_REQUEST);
        }
        $username = $data['username'];
        $password = $data['password'];*/
        //For Form handling
        $tokenProvider->cleanGarbage();
        $contentType = $request->headers->get("Content-Type");

        $username = $request->request->get('username');

        $user = $entityManager->getRepository(User::class)->findOneBy(['username' => $username]);
        if ($user === null) {
            return new Response('missing credentials',
                401,
                ['Access-Control-Allow-Origin' => '*']);
        }
        $password = $request->request->get('password');

        if (!$passwordHasher->isPasswordValid($user, $password)) {
            return new Response('Invalid credentials',
                401,
                ['Access-Control-Allow-Origin' => '*']);
        }

        $token = $tokenProvider->createToken($user);
    $t = $token->getToken();
        return new Response($t,
            200,
            ['Access-Control-Allow-Origin' => '*']);
    }

    #[Route('/user/test/connection', name: 'api_auth_test_connection', methods: ['GET'])]
    public function testConnection(Request $request): JsonResponse
    {
        return new JsonResponse (['message' => 'Ca passe !'], Response::HTTP_OK);
    }


    #[Route('/user/update', name: 'api_auth_update', methods: ['PUT'])]
    public function updateUser(Request $request, EntityManagerInterface $entityManager, UserPasswordHasherInterface $passwordHasher, TokenProvider $tokenProvider, TokenExtractor $tokenExtractor): JsonResponse
    {
        try {
            $userdata = json_decode($request->getContent(), true, 512, JSON_THROW_ON_ERROR);
        }catch (JsonException $e) {
            return new JsonResponse(['error' => 'Invalid JSON: ' . $e->getMessage()], Response::HTTP_BAD_REQUEST);
        }

        $token = $tokenExtractor->extractAccessToken($request);
        $user = $tokenProvider->validateToken($token);

        if($user === null){

            return $this->json(['error' => 'Invalid token'], Response::HTTP_BAD_REQUEST);
        }

        $username = $user->getUsername();
        $newPassword = $userdata['newpassword'];
        $oldPassword = $userdata['oldpassword'];

        if ($oldPassword === $newPassword || $username !== $user->getUsername()) {
            if($oldPassword === $newPassword){
                return $this->json(['message' => 'Error : Old and New are the Same'], Response::HTTP_OK);
            }

            return $this->json([
                'message' => 'missing credentials',
                'username' => $username,
            ], Response::HTTP_UNAUTHORIZED);
        }

        if (!$passwordHasher->isPasswordValid($user, $oldPassword)) {
            return new JsonResponse(['error' => 'Invalid credentials'
            ], Response::HTTP_UNAUTHORIZED);
        }
        $hashedPassword = $passwordHasher->hashPassword($user, $newPassword);
        $user->setPassword($hashedPassword);
        $entityManager->flush();
        return new JsonResponse (['message' => 'Password updated with success !'], Response::HTTP_OK);
    }

    #[Route('/user/delete', name: 'api_auth_delete', methods: ['DELETE'])]
    public function deleteUser(Request $request, EntityManagerInterface $entityManager, TokenProvider $tokenProvider, TokenExtractor $tokenExtractor): JsonResponse
    {

        $token = $tokenExtractor->extractAccessToken($request);
        //$token =
        $user = $tokenProvider->validateToken($token);

        if($user === null){
            return $this->json(['error' => 'Invalid token'], Response::HTTP_BAD_REQUEST);
        }

        $entityManager->remove($user);
        $entityManager->flush();

        return new JsonResponse (['message' => 'User delete with success !'], Response::HTTP_OK);
    }

}
