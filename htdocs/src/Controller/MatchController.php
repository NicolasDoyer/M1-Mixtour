<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class MatchController extends AbstractController{

    public function index(){
        return $this->render("match/match.html.twig");
    }
}
