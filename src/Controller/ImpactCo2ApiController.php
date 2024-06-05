<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Contracts\HttpClient\Exception\ClientExceptionInterface;
use Symfony\Contracts\HttpClient\Exception\RedirectionExceptionInterface;
use Symfony\Contracts\HttpClient\Exception\ServerExceptionInterface;
use Symfony\Contracts\HttpClient\Exception\TransportExceptionInterface;
use Symfony\Contracts\HttpClient\HttpClientInterface;
class ImpactCo2ApiController extends AbstractController
{
    public function __construct(
        private HttpClientInterface $client,
    ) {
    }

    /**
     * @throws TransportExceptionInterface
     */
    #[Route('/api/{categorieId}', name: 'api_call_impactco2', methods: ['POST'])]
    public function apiCallImpactCo2(int $categorieId, Request $request): Response
    {
        try {
            $data = json_decode($request->getContent(), true, 512, JSON_THROW_ON_ERROR);
        }
        catch (JsonException $e) {
            return new Response('Invalid JSON: ' . $e->getMessage(), Response::HTTP_BAD_REQUEST);
        }
        $categorieId = $data['categorieId'];
        $value = $data['value'];
        $cat = 100 - (int)$value;
        if($categorieId === 101 || $categorieId === 104 || $categorieId === 111 || $categorieId === 115){
            //Avion
                $response = $this->client->request('GET', 'https://impactco2.fr/api/v1/transport?km='.$value.'&displayAll=1&transports='.$cat.'&ignoreRadiativeForcing=0&numberOfPassenger=1&includeConstruction=1', [
                    'headers' => [
                        'Accept' => 'application/json',
                        'Authorization' => 'Bearer 55fd7a60-542f-4999-bbd0-ba623e50de32',
                        'Access-Control-Allow-Origin' => '*',
                    ],
                ]);
                try {
                    $dat = json_decode($response->getContent(), true, 512, JSON_THROW_ON_ERROR);
                } catch (JsonException $e) {
                    return new Response('Invalid JSON: ' . $e->getMessage(), Response::HTTP_BAD_REQUEST);
                }
                return new Response($dat["data"][0]["value"], 200, ['Access-Control-Allow-Origin' => '*'], true);

        }
        return new Response('Invalid JSON: categorieId is out of range', Response::HTTP_BAD_REQUEST);

        /*curl -X 'GET' \
  'https://impactco2.fr/api/v1/'.$theme.'?km=10000&displayAll=1&transports=15&ignoreRadiativeForcing=0&numberOfPassenger=1&includeConstruction=1' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer 55fd7a60-542f-4999-bbd0-ba623e50de32'*/
        //$jsonContent = $this->json([ "data" => "data"]);
        //$datas = $response->get('data');

        /*foreach($datas as $data){*/
            try {
                $dat = json_decode($response->getContent(), true, 512, JSON_THROW_ON_ERROR);
            } catch (JsonException $e) {
                return new Response('Invalid JSON: ' . $e->getMessage(), Response::HTTP_BAD_REQUEST);
            }
        //}


        return new Response($dat["data"][0]["value"], 200, ['Access-Control-Allow-Origin' => '*'], true);
    }

    /*private function CallAPI($method, $url, $data = false)
    {
        $curl = curl_init();

        switch ($method)
        {
            case "POST":
                curl_setopt($curl, CURLOPT_POST, 1);

                if ($data)
                    curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
                break;
            case "PUT":
                curl_setopt($curl, CURLOPT_PUT, 1);
                break;
            default:
                if ($data)
                    $url = sprintf("%s?%s", $url, http_build_query($data));
        }

        // Optional Authentication:
        curl_setopt($curl, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
        curl_setopt($curl, CURLOPT_USERPWD, "username:password");

        curl_setopt($curl, CURLOPT_URL, $url);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);

        $result = curl_exec($curl);

        curl_close($curl);

        return $result;
    }*/


}