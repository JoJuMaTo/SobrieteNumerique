<?php

namespace App\Security;

use App\Entity\AccessToken;
use App\Repository\AccessTokenRepository;
use App\Service\TokenProvider;
use Doctrine\ORM\EntityManager;
use Symfony\Component\Security\Core\Exception\BadCredentialsException;
use Symfony\Component\Security\Http\AccessToken\AccessTokenHandlerInterface;
use Symfony\Component\Security\Http\Authenticator\Passport\Badge\UserBadge;

readonly class AccessTokenHandler implements AccessTokenHandlerInterface
{

    public function __construct(
        private AccessTokenRepository $repository, private Tokenprovider $tokenProvider
    ) {
    }

    public function getUserBadgeFrom(string $accessToken): UserBadge
    {
        // e.g. query the "access token" database to search for this token
        $token = $this->repository->findOneByValue($accessToken);

        if ($token === null || !$this->tokenProvider->validateToken($accessToken)) {
            throw new BadCredentialsException('Invalid credentials.');
        }

        // and return a UserBadge object containing the user identifier from the found token
        // (this is the same identifier used in Security configuration; it can be an email,
        // a UUUID, a username, a database ID, etc.)
        if(!$token->getUser() !== null){
            return new UserBadge($token->getUser()->getUserIdentifier());
        }
        //return new UserBadge(null);
    }
}