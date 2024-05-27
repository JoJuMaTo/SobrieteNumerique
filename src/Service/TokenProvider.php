<?php
// src/Service/TokenProvider.php
namespace App\Service;

use App\Entity\AccessToken;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Random\RandomException;
use Symfony\Component\Security\Core\User\UserInterface;

class TokenProvider
{
    private EntityManagerInterface $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    /**
     * @throws RandomException
     */
    public function createToken(User $user): AccessToken
    {
        $token = new AccessToken();
        $token->setToken(bin2hex(random_bytes(32)));
        $token->setUser($user);
        $token->setExpiresAt(new \DateTimeImmutable('+1 hour'));

        $this->entityManager->persist($token);
        $this->entityManager->flush();

        return $token;
    }

    public function validateToken(string $token): ?User
    {
        $tokenRepo = $this->entityManager->getRepository(AccessToken::class);
        $tokenEntity = $tokenRepo->findOneBy(['token' => $token]);

        if ($tokenEntity && $tokenEntity->getExpiresAt() > new \DateTime()) {
            return $tokenEntity->getUser();
        }

        return null;
    }

    public function invalidateToken(string $token): void
    {
        $tokenRepo = $this->entityManager->getRepository(AccessToken::class);
        $tokenEntity = $tokenRepo->findOneBy(['token' => $token]);

        if ($tokenEntity) {
            $this->entityManager->remove($tokenEntity);
            $this->entityManager->flush();
        }
    }

    public function cleanGarbage(): void{
        $tokenRepo = $this->entityManager->getRepository(AccessToken::class);
        $tokens = $tokenRepo->findAll();
        foreach ($tokens as $token) {
            if($token->getExpiresAt() < new \DateTime()){
                $this->entityManager->remove($token);
                $this->entityManager->flush();
            }
        }

    }
}
