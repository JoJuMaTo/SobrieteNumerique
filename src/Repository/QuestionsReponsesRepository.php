<?php

namespace App\Repository;

use App\Entity\QuestionsReponses;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<QuestionsReponses>
 */
class QuestionsReponsesRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, QuestionsReponses::class);
    }

    //    /**
    //     * @return QuestionsReponses[] Returns an array of QuestionsReponses objects
    //     */
    //    public function findByExampleField($value): array
    //    {
    //        return $this->createQueryBuilder('q')
    //            ->andWhere('q.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->orderBy('q.id', 'ASC')
    //            ->setMaxResults(10)
    //            ->getQuery()
    //            ->getResult()
    //        ;
    //    }

    //    public function findOneBySomeField($value): ?QuestionsReponses
    //    {
    //        return $this->createQueryBuilder('q')
    //            ->andWhere('q.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->getQuery()
    //            ->getOneOrNullResult()
    //        ;
    //    }
    public function findAllByQuizId(int $quizId): array
    {
        return $this->createQueryBuilder('q')
            ->where('q.quizId = :quizId')
            ->setParameter('quizId', $quizId)
            ->orderBy('q.id', 'ASC')
            ->getQuery()
            ->getResult();
    }
    public function findOneWeightByAnswerId(int $id, int $quizId, string $answer): string
    {
        $results = $this->createQueryBuilder('q')
            ->where('q.id = :id')
            ->andWhere('q.quizId = :quizId')
            ->setParameter('id', $id)
            ->setParameter('quizId', $quizId)
            ->getQuery()
            ->getResult();
        foreach($results as $result) {
            if($answer === $result->getStrAnswer1()){
                return $result->getWeight1();
            }
            if($answer === $result->getStrAnswer2()){
                return $result->getWeight2();
            }
            if($answer === $result->getStrAnswer3()){
                return $result->getWeight3();
            }
            if($answer === $result->getStrAnswer4()){
                return $result->getWeight4();
            }
            if($answer === $result->getStrAnswer5()){
                return $result->getWeight5();
            }

        }
        return "undefined";

    }
    public function findResponseStringByResponseId(int $responseId, int $id, int $quizId): string{

            $results = $this->createQueryBuilder('q')
            ->where('q.id = :questionId')
            ->andWhere('q.quizId = :quizId')
            ->setParameter('id', $id)
            ->setParameter('quizId', $quizId)
            ->getQuery()
            ->getOneOrNullResult();
        return match ($responseId) {
            1 => $results->getStrAnswer1(),
            2 => $results->getStrAnswer2(),
            3 => $results->getStrAnswer3(),
            4 => $results->getStrAnswer4(),
            5 => $results->getStrAnswer5(),
            default => "",
        };
    }
    public function findResponseIdByResponseString(string $response, int $id, int $quizId): int{

            $results = $this->createQueryBuilder('q')
            ->where('q.id = :id')
            ->andWhere('q.quizId = :quizId')
            ->setParameter('id', $id)
            ->setParameter('quizId', $quizId)
            ->getQuery()
            ->getOneOrNullResult();
            return match ($response) {
                $results->getStrAnswer1() => 1,
                $results->getStrAnswer2() => 2,
                $results->getStrAnswer3() => 3,
                $results->getStrAnswer4() => 4,
                $results->getStrAnswer5() => 5,
                default => 0
            };
    }
    public function findCategorieIdByQuestionId(int $id): ?int
    {
        $res = $this->createQueryBuilder('q')
            ->where('q.id = :id')

            ->setParameter('id', $id)
            ->getQuery()
            ->getOneOrNullResult();
        return $res->getCategoryId();
    }
}
