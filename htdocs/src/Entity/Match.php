<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ApiResource()
 * @ORM\Entity(repositoryClass="App\Repository\MatchRepository")
 */
class Match
{

    /**
     * @ORM\ManyToOne(targetEntity="User")
     */
    private $joueur1;


    /**
     * @ORM\ManyToOne(targetEntity="User")
     */
    private $joueur2;


    /**
     * @ORM\ManyToOne(targetEntity="User")
     * @ORM\Column(nullable=true).
     */
    private $vainqueur;


    /**
     * @ORM\ManyToOne(targetEntity="Tournament")
     */
    private $tournament;


    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="datetime")
     */
    private $date;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDate(): ?\DateTimeInterface
    {
        return $this->date;
    }

    public function setDate(\DateTimeInterface $date): self
    {
        $this->date = $date;

        return $this;
    }

    public function getJoueur1(): ?User
    {
        return $this->joueur1;
    }

    public function setJoueur1(?User $joueur1): self
    {
        $this->joueur1 = $joueur1;

        return $this;
    }

    public function getJoueur2(): ?User
    {
        return $this->joueur2;
    }

    public function setJoueur2(?User $joueur2): self
    {
        $this->joueur2 = $joueur2;

        return $this;
    }

    public function getTournament(): ?Tournament
    {
        return $this->tournament;
    }

    public function setTournament(?Tournament $tournament): self
    {
        $this->tournament = $tournament;

        return $this;
    }

    public function getVainqueur(): ?User
    {
        return $this->vainqueur;
    }

    public function setVainqueur(?User $vainqueur): self
    {
        $this->vainqueur = $vainqueur;

        return $this;
    }
}
