<?php

namespace App\Controller;

use App\Entity\Tournament;
use App\Entity\User;
use App\Form\TournamentType;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;

class TournamentController extends AbstractController{

    public function index()
    {
        if($this->getUser()){
            $tournaments = $this->getDoctrine()
                ->getRepository(Tournament::class)
                ->findAll();

            return $this->render('page/indexTournament.html.twig', [
                'tournaments' => $tournaments,
            ]);
        }
        return $this->redirectToRoute('security_login');
    }

    public function new(Request $request)
    {
        $tournament = new Tournament();
        $form = $this->createForm(TournamentType::class,$tournament);
        $form->handleRequest($request);

        if($form->isSubmitted() && $form->isValid()){

            $manager = $this->getDoctrine()->getManager();
            $manager->persist($tournament);
            $manager->flush();

            $this->addFlash("success", "Tournoi créer");
            return $this->redirectToRoute('tournaments');
        }
        return $this->render('page/newTournament.html.twig', array(
            'form' => $form->createView()
        ));
    }

    public function edit(Request $request, Tournament $tournament)
    {

        $form = $this->createForm(TournamentType::class,$tournament);
        $form->handleRequest($request);

        if($form->isSubmitted() && $form->isValid()){

            $manager = $this->getDoctrine()->getManager();
            $manager->persist($tournament);
            $manager->flush();

            $this->addFlash("success", "Tournoi Modifier");
            return $this->redirectToRoute('tournaments');
        }
        return $this->render('page/editTournament.html.twig', array(
            'edit_form' => $form->createView()
        ));
    }

    public function registration(Tournament $tournament, User $user){

        $manager = $this->getDoctrine()->getManager();

        $tournament->addUser($user);
        $manager->persist($tournament);
        $manager->flush();

        return $this->redirectToRoute('tournaments');

    }

    public function unregistration(Tournament $tournament, User $user){

        $manager = $this->getDoctrine()->getManager();

        $tournament->removeUser($user);
        $manager->persist($tournament);
        $manager->flush();

        return $this->redirectToRoute('tournaments');

    }

}