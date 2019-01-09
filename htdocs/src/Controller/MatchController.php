<?php

namespace App\Controller;

use App\Entity\Match;
use App\Entity\User;
use App\Form\TournamentType;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;

class MatchController extends AbstractController{

    public function index(User $user)
    {

        $manager = $this->getDoctrine()->getManager();

        $matchs = $manager->createQuery('SELECT M FROM Match M 
                            WHERE M.joueur1 = :user OR M.joueur2 = :user')
            ->setParameter('user', $user)
            ->getResult();

        return $this->render('page/mesMatchs.html.twig', [
            'matchs' => $matchs,
        ]);
    }

}