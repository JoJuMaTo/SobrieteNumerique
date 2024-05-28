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
}
