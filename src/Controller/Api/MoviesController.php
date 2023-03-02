<?php

namespace App\Controller\Api;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\DBAL\Connection;

class MoviesController extends AbstractController
{
    #[Route('/api/movies')]
    public function list(Connection $db, Request $req): Response
    {
        $genreId = $req->query->get('genreId');
        
        $q = $db->createQueryBuilder()
            ->select("m.*")
            ->from("movies", "m")
            ->orderBy("m.release_date", "DESC");
            
        // Join the query with the movies_genres table to filter the movies

        if ($genreId) {
            $q->join("m", "movies_genres", "mg", "m.id = mg.movie_id")
            ->where("mg.genre_id = :genreId")
            ->setParameter("genreId", $genreId);
        }

        $rows = $q
            ->setMaxResults(50)
            ->executeQuery()
            ->fetchAllAssociative();


        return $this->json([
            "movies" => $rows
        ]);
    }

}