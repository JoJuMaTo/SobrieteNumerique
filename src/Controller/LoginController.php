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
use Symfony\Component\Security\Http\Attribute\CurrentUser;

class LoginController extends AbstractController
{
    #[Route('/user/login', name: 'api_user_login', methods: ['POST'])]
     public function userLogin(#[CurrentUser] ?User $user): Response
{
             if (null === $user) {
                 return $this->json([
                         'message' => 'missing credentials',
                     ], Response::HTTP_UNAUTHORIZED);
         }

         $token = createToken(); // somehow create an API token for $user

          return $this->json([
                           'user'  => $user->getUserIdentifier(),
                           'token' => $token,
          ]);
      }
    #[Route('/user/register', name: 'api_user_register', methods: ['POST'])]
    public function userRegister(Request $request, UserPasswordHasherInterface $passwordHasher, EntityManagerInterface $entityManager): JsonResponse
    {
        $user = new User();
        $hashedPassword = $passwordHasher->hashPassword($user, $user->getPassword());
        $user->setPassword($hashedPassword);
        $entityManager->persist($user);
        $entityManager->flush();
        $message = 'User '.$user->getEmail().' created successfully';
        return $this->json([
            'message' => $message,

        ]);
    }

    #[Route('/user/delete', name: 'api_user_delete', methods: ['POST'])]
    public function userDelete(): JsonResponse
    {
        return $this->json([
            'message' => 'Welcome to your new controller!',

        ]);
    }

    #[Route('/user/update', name: 'app_user_update', methods: ['POST'])]
    public function userUpdate(): JsonResponse
    {
        return $this->json([
            'message' => 'Welcome to your new controller!',

        ]);
    }
}
