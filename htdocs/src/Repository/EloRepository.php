<?php

namespace App\Repository;

use App\Entity\Elo;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method Elo|null find($id, $lockMode = null, $lockVersion = null)
 * @method Elo|null findOneBy(array $criteria, array $orderBy = null)
 * @method Elo[]    findAll()
 * @method Elo[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class EloRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, Elo::class);
    }

    // /**
    //  * @return Elo[] Returns an array of Elo objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('e')
            ->andWhere('e.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('e.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Elo
    {
        return $this->createQueryBuilder('e')
            ->andWhere('e.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
