<?php declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20190109115503 extends AbstractMigration
{
    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE elo (id INT AUTO_INCREMENT NOT NULL, tournament_id INT NOT NULL, user_id INT NOT NULL, elo INT NOT NULL, INDEX IDX_A51888BB33D1A3E7 (tournament_id), INDEX IDX_A51888BBA76ED395 (user_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE `match` (id INT AUTO_INCREMENT NOT NULL, joueur1_id INT DEFAULT NULL, joueur2_id INT DEFAULT NULL, tournament_id INT DEFAULT NULL, vainqueur_id INT DEFAULT NULL, date DATETIME NOT NULL, INDEX IDX_7A5BC50592C1E237 (joueur1_id), INDEX IDX_7A5BC50580744DD9 (joueur2_id), INDEX IDX_7A5BC50533D1A3E7 (tournament_id), INDEX IDX_7A5BC505773C35EE (vainqueur_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE elo ADD CONSTRAINT FK_A51888BB33D1A3E7 FOREIGN KEY (tournament_id) REFERENCES tournament (id)');
        $this->addSql('ALTER TABLE elo ADD CONSTRAINT FK_A51888BBA76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE `match` ADD CONSTRAINT FK_7A5BC50592C1E237 FOREIGN KEY (joueur1_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE `match` ADD CONSTRAINT FK_7A5BC50580744DD9 FOREIGN KEY (joueur2_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE `match` ADD CONSTRAINT FK_7A5BC50533D1A3E7 FOREIGN KEY (tournament_id) REFERENCES tournament (id)');
        $this->addSql('ALTER TABLE `match` ADD CONSTRAINT FK_7A5BC505773C35EE FOREIGN KEY (vainqueur_id) REFERENCES user (id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('DROP TABLE elo');
        $this->addSql('DROP TABLE `match`');
    }
}
