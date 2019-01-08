<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class PromoController extends AbstractController
{
    /**
     * @Route("/promo", name="promo")
     */
    public function index()
    {
        return $this->render("promo/promo.html.twig");
    }
}
