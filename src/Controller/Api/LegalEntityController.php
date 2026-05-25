<?php

namespace App\Controller\Api;

use Doctrine\DBAL\Connection;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/legal-entities')]
class LegalEntityController extends AbstractController
{
    #[Route('', name: 'api_legal_entities', methods: ['GET'])]
    public function getLegalEntities(Connection $connection): JsonResponse
    {
        try {
            // Получаем данные напрямую из БД через SQL
            $sql = "SELECT id, short_name, full_name, unp FROM legal_entity ORDER BY id";
            $legalEntities = $connection->fetchAllAssociative($sql);
            
            $data = [
                [
                    'id' => 'all',
                    'short_name' => 'Все Юрлица',
                    'full_name' => 'Все организации'
                ]
            ];
            
            foreach ($legalEntities as $entity) {
                $data[] = [
                    'id' => $entity['id'],
                    'short_name' => $entity['short_name'],
                    'full_name' => $entity['full_name'],
                    'unp' => $entity['unp']
                ];
            }
            
            return $this->json($data);
            
        } catch (\Exception $e) {
            return $this->json([
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ], 500);
        }
    }
}