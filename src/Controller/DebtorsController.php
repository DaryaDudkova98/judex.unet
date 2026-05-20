<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class DebtorsController extends AbstractController
{
    #[Route('/debtors', name: 'debtors')]
    public function index(): Response
    {
        return $this->render('debtors/index.html.twig');
    }
    
    // ИСПРАВЛЕНО: изменен путь с /debtor/{id} на /debtors/{id}
    #[Route('/debtors/{id}', name: 'debtor_show')]
    public function show(int $id): Response
    {
        return $this->render('debtors/show.html.twig', [
            'id' => $id,
        ]);
    }
}
