<?php
namespace App\Entity;

use App\Repository\AccessTokenRepository;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\DBAL\Types\Types;

/**
 * @ORM\Entity(repositoryClass="App\Repository\TokenRepository")
 */
#[ORM\Entity(repositoryClass: AccessTokenRepository::class)]
class Token2
{
    #[ORM\Id]
    #ORM\GeneratedValue
    #[ORM\Column(type="integer")]
    private int $id;

    @ORM\Column(type="string", length=255, unique=true)
    private mixed $token;

    @ORM\ManyToOne(targetEntity="App\Entity\User")
    @ORM\JoinColumn(nullable=false)
    private mixed $user;

    @ORM\Column(type="datetime")
    private mixed $expiresAt;

    /**
     * @return int
     */
    public function getId(): int
    {
        return $this->id;
    }

    /**
     * @param int $id
     */
    public function setId(int $id): void
    {
        $this->id = $id;
    }

    /**
     * @return mixed
     */
    public function getToken(): mixed
    {
        return $this->token;
    }

    /**
     * @param mixed $token
     */
    public function setToken(mixed $token): void
    {
        $this->token = $token;
    }

    /**
     * @return mixed
     */
    public function getUser(): mixed
    {
        return $this->user;
    }

    /**
     * @param mixed $user
     */
    public function setUser(mixed $user): void
    {
        $this->user = $user;
    }

    /**
     * @return mixed
     */
    public function getExpiresAt(): mixed
    {
        return $this->expiresAt;
    }

    /**
     * @param mixed $expiresAt
     */
    public function setExpiresAt(mixed $expiresAt): void
    {
        $this->expiresAt = $expiresAt;
    }

}