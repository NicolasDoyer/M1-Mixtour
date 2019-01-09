<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\TournamentRepository")
 */
class Tournament
{

    /**
     * @ORM\ManyToMany(targetEntity="User")
     */
    private $users;

    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $name;

    /**
     * @ORM\Column(type="datetime")
     */
    private $date;

    /**
     * @ORM\Column(type="text", nullable=true)
     */
    private $description;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Elo", mappedBy="tournament")
     */
    private $elos;

    public function __construct()
    {
        $this->users = new ArrayCollection();
        $this->elos = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
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

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): self
    {
        $this->description = $description;

        return $this;
    }

    /**
     * @return Collection|User[]
     */
    public function getUsers(): Collection
    {
        return $this->users;
    }

    public function addUser(User $user): self
    {
        if (!$this->users->contains($user)) {
            $this->users[] = $user;
        }

        return $this;
    }

    public function removeUser(User $user): self
    {
        if ($this->users->contains($user)) {
            $this->users->removeElement($user);
        }

        return $this;
    }

    /**
     * @return Collection|Elo[]
     */
    public function getElos(): Collection
    {
        return $this->elos;
    }

    public function addElo(Elo $elo): self
    {
        if (!$this->elos->contains($elo)) {
            $this->elos[] = $elo;
            $elo->setTournament($this);
        }

        return $this;
    }

    public function removeElo(Elo $elo): self
    {
        if ($this->elos->contains($elo)) {
            $this->elos->removeElement($elo);
            // set the owning side to null (unless already changed)
            if ($elo->getTournament() === $this) {
                $elo->setTournament(null);
            }
        }

        return $this;
    }
}
