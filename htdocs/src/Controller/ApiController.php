<?php

namespace App\Controller;


use Lexik\Bundle\JWTAuthenticationBundle\Encoder\JWTEncoderInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class ApiController extends AbstractController{

    public function verify_token(Request $request, JWTEncoderInterface $JWTTokenManager){

        // Get token from query
        $token = $request->query->get('token');
        if(!$token){
            $response = new JsonResponse(array("status" => 400, "message" => "Missing token argument"),400);
            $response->headers->set('Content-Type', 'application/json');
            return $response;
        }

        // Try to decoding token
        try{
            $JWTTokenManager->decode($token);
        }catch (\Exception $e){
            $response = new JsonResponse(array("status" => 200, "token" => array("error" => 1, "message" => "invalid token")),200);
            $response->headers->set('Content-Type', 'application/json');
            return $response;
        }

        // If no exception, then the token is valid
        $response = new JsonResponse(array("status" => 200, "token" => array("message" => "valid token")),200);
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }

    public function create_token(JWTTokenManagerInterface $JWTTokenManager){
        $user = $this->getUser();
        if($user){
            $token = $JWTTokenManager->create($user);
            $response = new JsonResponse(array("status" => 200, "token" => $token, "user_id" => $user->getId()),200);
            $response->headers->set('Content-Type', 'application/json');
            return $response;
        }
        $response = new JsonResponse(array("status" => 403, "message" => "You are not allowed to create a token"),200);
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }
}