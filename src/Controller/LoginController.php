<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

class LoginController extends AbstractController
{
    #[Route('/user/login', name: 'app_login')]
    public function login(): JsonResponse
    {
        return $this->json([
            'message' => 'Welcome to your new controller!',

        ]);
    }
    #[Route('/user/register', name: 'app_register')]
    public function index(): JsonResponse
    {
        return $this->json([
            'message' => 'Welcome to your new controller!',

        ]);
    }

    #[Route('/user/delete', name: 'app_delete')]
    public function delete(): JsonResponse
    {
        return $this->json([
            'message' => 'Welcome to your new controller!',

        ]);
    }

    #[Route('/user/update', name: 'app_update')]
    public function update(): JsonResponse
    {
        return $this->json([
            'message' => 'Welcome to your new controller!',

        ]);
    }
}
