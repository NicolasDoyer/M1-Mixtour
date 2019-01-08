<?php

namespace App\Controller;

use App\Entity\User;
use App\Form\UserType;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;

class SecurityController extends AbstractController{

    public function login(AuthenticationUtils $authenticationUtils){
        if(!$this->getUser()){
            $lastUsername = $authenticationUtils->getLastUsername();
            $error = $authenticationUtils->getLastAuthenticationError();
            if($error){
                $this->addFlash('error', $error->getMessageKey());
            }
            return $this->render('security/login.html.twig', array(
                'last_username' => $lastUsername,
            ));
        }
        return $this->redirectToRoute('home');
    }

    public function register(Request $request, UserPasswordEncoderInterface $passwordEncoder){
        $user = new User();
        $form = $this->createForm(UserType::class,$user);
        $form->handleRequest($request);

        if($form->isSubmitted() && $form->isValid()){

            // Encoding password
            $encodedPassword = $passwordEncoder->encodePassword($user,$user->getPassword());
            $user->setPassword($encodedPassword);

            //Saving user
            $manager = $this->getDoctrine()->getManager();
            $manager->persist($user);
            $manager->flush();

            $this->addFlash("success", "Inscription réussie");
            return $this->redirectToRoute('home');
        }
        return $this->render('security/register.html.twig', array(
            'form' => $form->createView()
        ));
    }
}