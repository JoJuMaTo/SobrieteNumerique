<?php

namespace App\Entity;

use App\Repository\QuestionsReponsesRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: QuestionsReponsesRepository::class)]
class QuestionsReponses
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $strQuestion = null;

    #[ORM\Column(length: 255)]
    private ?string $strAnswer1 = null;

    #[ORM\Column(length: 255)]
    private ?string $strAnswer2 = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $strAnswer3 = null;

    #[ORM\Column(length: 255)]
    private ?string $strAnswer4 = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $strAnswer5 = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $weight1 = null;
    #[ORM\Column(length: 255, nullable: true)]
    private ?string $weight2 = null;
    #[ORM\Column(length: 255, nullable: true)]
    private ?string $weight3 = null;
    #[ORM\Column(length: 255, nullable: true)]
    private ?string $weight4 = null;
    #[ORM\Column(length: 255, nullable: true)]
    private ?string $weight5 = null;
    #[ORM\Column]
    private ?int $categoryId = null;

    #[ORM\Column]
    private ?int $quizId = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getStrQuestion(): ?string
    {
        return $this->strQuestion;
    }

    public function setStrQuestion(string $question): static
    {
        $this->strQuestion = $question;

        return $this;
    }

    public function getStrAnswer1(): ?string
    {
        return $this->strAnswer1;
    }

    public function setStrAnswer1(string $strAnswer1): static
    {
        $this->strAnswer1 = $strAnswer1;

        return $this;
    }

    public function getStrAnswer2(): ?string
    {
        return $this->strAnswer2;
    }

    public function setStrAnswer2(string $strAnswer2): static
    {
        $this->strAnswer2 = $strAnswer2;

        return $this;
    }

    public function getStrAnswer3(): ?string
    {
        return $this->strAnswer3;
    }

    public function setStrAnswer3(?string $strAnswer3): static
    {
        $this->strAnswer3 = $strAnswer3;

        return $this;
    }

    public function getStrAnswer4(): ?string
    {
        return $this->strAnswer4;
    }

    public function setStrAnswer4(string $strAnswer4): static
    {
        $this->strAnswer4 = $strAnswer4;

        return $this;
    }

    public function getStrAnswer5(): ?string
    {
        return $this->strAnswer5;
    }

    public function setStrAnswer5(?string $strAnswer5): static
    {
        $this->strAnswer5 = $strAnswer5;

        return $this;
    }

    public function setWeight1(string $weight1): static
    {
        $this->weight1 = $weight1;

        return $this;
    }
    public function getWeight1(): ?string
    {
        return $this->weight1;
    }

    public function setWeight2(string $weight2): static
    {
        $this->weight2 = $weight2;

        return $this;
    }
    public function getWeight2(): ?string
    {
        return $this->weight2;
    }

    public function setWeight3(string $weight3): static
    {
        $this->weight3 = $weight3;

        return $this;
    }
    public function getWeight3(): ?string
    {
        return $this->weight3;
    }

    public function setWeight4(string $weight4): static
    {
        $this->weight4 = $weight4;

        return $this;
    }
    public function getWeight4(): ?string
    {
        return $this->weight4;
    }

    public function setWeight5(string $weight5): static
    {
        $this->weight5 = $weight5;

        return $this;
    }
    public function getWeight5(): ?string
    {
        return $this->weight5;
    }

    public function getCategoryId(): ?int
    {
        return $this->categoryId;
    }

    public function setCategoryId(int $categoryId): static
    {
        $this->categoryId = $categoryId;

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
}
