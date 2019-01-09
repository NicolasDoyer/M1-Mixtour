<?php

namespace App\Controller;

use App\Entity\Match;
use App\Entity\User;
use App\Form\TournamentType;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;

class MatchController extends AbstractController{

    public function index()
    {
        if($this->getUser()){
            $entityManager = $this->getDoctrine()->getRepository(Match::class);
            return $this->render('page/mesMatchs.html.twig', [
                'matchs' => $entityManager->findAllMatchesByUser($this->getUser()),
            ]);
        }
        return $this->redirectToRoute('security_login');
    }

}