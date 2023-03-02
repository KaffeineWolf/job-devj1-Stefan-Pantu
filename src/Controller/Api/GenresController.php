<?php

namespace App\Controller\Api;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\DBAL\Connection;
use Doctrine\ORM\Mapping as ORM;

// --------------------------------
// Genre controller for getting the genres 
// table to populate the select field
// -------------------------------- 

class GenresController extends AbstractController
{
    #[Route('/api/genres')]
    public function list(Connection $db): Response
    {
        $rows = $db
            ->createQueryBuilder()
            ->select("g.*")
            ->from("genres", "g")
            ->executeQuery()
            ->fetchAllAssociative();

        return $this->json([
            "genres" => $rows
        ]);
    }
}