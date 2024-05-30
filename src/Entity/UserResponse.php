<?php

namespace App\Entity;

use App\Repository\UserResponseRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: UserResponseRepository::class)]
class UserResponse
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column]
    private ?int $userId = null;

    #[ORM\Column]
    private ?int $quizId = null;

    #[ORM\Column]
    private ?int $questionId = null;

    #[ORM\Column(length: 255)]
    private ?int $choice = null;

    #[ORM\Column(length: 255)]
    private ?string $weight = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUserId(): ?int
    {
        return $this->userId;
    }

    public function setUserId(int $userId): static
    {
        $this->userId = $userId;

        return $this;
    }

    public function getQuizId(): ?int
    {
        return $this->quizId;
    }

    public function setQuizId(int $quizId): static
    {
        $this->quizId = $quizId;

        return $this;
    }

    public function getQuestionId(): ?int
    {
        return $this->questionId;
    }

    public function setQuestionId(int $questionId): static
    {
        $this->questionId = $questionId;

        return $this;
    }

    public function getChoice(): ?int
    {
        return $this->choice;
    }

    public function setChoice(int $choice): static
    {
        $this->choice = $choice;

        return $this;
    }

    public function getWeight(): ?string
    {
        return $this->weight;
    }

    public function setWeight(string $weight): static
    {
        $this->weight = $weight;

        return $this;
    }
}
