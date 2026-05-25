<?php

namespace App\Repository;

use App\Entity\LegalEntity;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<LegalEntity>
 */
class LegalEntityRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, LegalEntity::class);
    }

    // Добавьте свои методы если нужно
    public function findAllOrderedByShortName(): array
    {
        return $this->createQueryBuilder('l')
            ->orderBy('l.short_name', 'ASC')
            ->getQuery()
            ->getResult();
    }
}
