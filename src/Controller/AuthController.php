<?php

namespace App\Controller;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
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
        $username = $request->request->get('username');
        $password = $request->request->get('password');
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

    #[Route('/user/login', name: 'api_auth_login_user', methods: ['POST'])]
    public function userLogin(Request $request, EntityManagerInterface $entityManager, UserPasswordHasherInterface $passwordHasher): JsonResponse
    {
        $username = $request->request->get('username');

        $user = $entityManager->getRepository(User::class)->findOneBy(['username' => $username]);
        if ($user === null) {
            return $this->json([
                'message' => 'missing credentials',
            ], Response::HTTP_UNAUTHORIZED);
        }
        $password = $request->request->get('password');

        if (!$passwordHasher->isPasswordValid($user, $password)) {
            return new JsonResponse(['error' => 'Invalid credentials',
                'user' => $user->getEmail(),
                'password' => $password,
                'check_password' => $passwordHasher->isPasswordValid($user, $password),
            ], Response::HTTP_UNAUTHORIZED);
        }

        //$token = $tokenProvider->createToken($user); // somehow create an API token for $user

        return $this->json([
            'user'  => $user->getUserIdentifier(),
            //'token' => $token,
        ]);
    }
}
