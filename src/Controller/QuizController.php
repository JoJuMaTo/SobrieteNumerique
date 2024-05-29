<?php

namespace App\Controller;

use App\Entity\QuestionsReponses;
use App\Entity\Quiz;
use App\Repository\QuizRepository;
use App\Security\TokenExtractor;
use App\Service\TokenProvider;
use DateTime;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Exception\JsonException;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Encoder\XmlEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;


class QuizController extends AbstractController
{
    #[Route('/quiz/{id}', name: 'api_quiz_getall', methods: ['GET'])]
    public function quizGetAllQuestions(string $id, EntityManagerInterface $entityManager): JsonResponse
    {
        $encoders = [new XmlEncoder(), new JsonEncoder()];
        $normalizers = [new ObjectNormalizer()];

        $serializer = new Serializer($normalizers, $encoders);
        $QRRepo = $entityManager->getRepository(QuestionsReponses::class);

        $questions = $QRRepo->findAllByQuizId($id);

        $jsonContent = $serializer->serialize($questions, 'json', ['json_encode_options' => \JSON_UNESCAPED_SLASHES | \JSON_UNESCAPED_UNICODE]);
        /*$jsonArray = json_decode($jsonContent, true, 512, JSON_THROW_ON_ERROR);
        print_r($jsonArray);*/
        return new JsonResponse($jsonContent, 200, [], true);
    }
    private function newQuestion(string $question, string $answer1, string $answer2, string $answer3, string $answer4, string $answer5, string $weight1, string $weight2, string $weight3, string $weight4, string $weight5, int $quizId, int $categorieId): QuestionsReponses
    {
        $quest_obj = new QuestionsReponses();
        $quest_obj->setStrQuestion($question);
        $quest_obj->setStrAnswer1($answer1);
        $quest_obj->setStrAnswer2($answer2);
        $quest_obj->setStrAnswer3($answer3);
        $quest_obj->setStrAnswer4($answer4);
        $quest_obj->setStrAnswer5($answer5);
        $quest_obj->setWeight1($weight1);
        $quest_obj->setWeight2($weight2);
        $quest_obj->setWeight3($weight3);
        $quest_obj->setWeight4($weight4);
        $quest_obj->setWeight5($weight5);
        $quest_obj->setQuizId($quizId);
        $quest_obj->setCategoryId($categorieId);
        return $quest_obj;
    }
    #[Route('/quiz/{id}/addquestion', name: 'api_quiz_add_question', methods: ['POST'])]
    public function quizAddQuestion(Request $request, TokenExtractor $tokenExtractor, TokenProvider $tokenProvider, EntityManagerInterface $entityManager, string $id): Response
    {
        /*$token = $tokenExtractor->extractAccessToken($request);
        $user = $tokenProvider->validateToken($token);
        if($user === null){
            return new Response('Invalid token', Response::HTTP_BAD_REQUEST);
        }
        $userId = $user->getId();*/
        try {
            $data = json_decode($request->getContent(), true, 512, JSON_THROW_ON_ERROR);
        } catch (JsonException $e) {
            return new Response('Invalid JSON: ' . $e->getMessage(), Response::HTTP_BAD_REQUEST);
        }
        $quizRepo = $entityManager->getRepository(Quiz::class);
        if($quizRepo->isThereAQuiz($id)){
            $question = $this->newQuestion($data['strQuestion'], $data['strAnswer1'], $data['strAnswer2'], $data['strAnswer3'], $data['strAnswer4'], $data['strAnswer5'], $data['weight1'], $data['weight2'], $data['weight3'], $data['weight4'], $data['weight5'], $data['categorieId'], $id);
            $entityManager->persist($question);
            $entityManager->flush();
            return new Response('Question added',
                200);
        }
        $quiz = $this->newQuiz("","");
        $question = $this->newQuestion($data['strQuestion'], $data['strAnswer1'], $data['strAnswer2'], $data['strAnswer3'], $data['strAnswer4'], $data['strAnswer5'], $data['weight1'], $data['weight2'], $data['weight3'], $data['weight4'], $data['weight5'], $data['categorieId'], $quiz->getId());
        $entityManager->persist($question);
        $entityManager->persist($quiz);
        $entityManager->flush();
        return new Response('New Quiz '.$quiz->getId() .' and Question add',
            200);


    }
    private function newQuiz(string $titre, string $description): Quiz{
        $quiz = new Quiz();
        $titre = $titre === "" ? "undefined": $titre;
        $quiz->setTitre($titre);
        $description = $description === "" ? "undefined": $description;
        $quiz->setDescription($description);
        $quiz->setDateCreation(new DateTime('now'));
        return $quiz;
    }
    #[Route('/quiz/add', name: 'api_quiz_add_quiz', methods: ['POST'])]
    public function quizCreate(Request $request, TokenExtractor $tokenExtractor, TokenProvider $tokenProvider, EntityManagerInterface $entityManager): Response
    {
        try {
            $data = json_decode($request->getContent(), true, 512, JSON_THROW_ON_ERROR);
        } catch (JsonException $e) {
            return new JsonResponse(['error' => 'Invalid JSON: ' . $e->getMessage()], Response::HTTP_BAD_REQUEST);
        }
        $quiz = $this->newQuiz($data['titre'], $data['description']);
        $entityManager->persist($quiz);
        $entityManager->flush();

        return new Response('Quiz created with success !', Response::HTTP_OK);
    }

    #[Route('/quiz/{id}/response', name: 'api_quiz_response', methods: ['POST'])]
    public function quizResponse(Request $request, TokenExtractor $tokenExtractor, TokenProvider $tokenProvider, EntityManagerInterface $entityManager, int $id): Response
    {
        $token = $tokenExtractor->extractAccessToken($request);
        $user = $tokenProvider->validateToken($token);
        if($user === null){

            return new Response('Invalid token', Response::HTTP_BAD_REQUEST);
        }
        $userId = $user->getId();

        try {
            $data = json_decode($request->getContent(), true, 512, JSON_THROW_ON_ERROR);
        } catch (JsonException $e) {
            return new Response('Invalid JSON: ' . $e->getMessage(), Response::HTTP_BAD_REQUEST);
        }
        $questionId = $data['questionId'];
        $choice = $data['choice'];
        $weight = $data['weight'];
        $response = new QuizResponse();
        $response->setQuestionId($questionId);
        $response->setChoice($choice);
        $response->setUserId($userId);
        $response->setQuizId($id);
        $response->setWeight($weight);

        $entityManager->persist($response);
        $entityManager->flush();
        return new Response('QuizResponse recorded', 200);
    }
}
