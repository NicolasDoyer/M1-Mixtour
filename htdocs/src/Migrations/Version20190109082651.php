<?php declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20190109082651 extends AbstractMigration
{
    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE `match` DROP FOREIGN KEY FK_7A5BC505773C35EE');
        $this->addSql('DROP INDEX IDX_7A5BC505773C35EE ON `match`');
        $this->addSql('ALTER TABLE `match` ADD vainqueur VARCHAR(255) DEFAULT NULL, DROP vainqueur_id');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE `match` ADD vainqueur_id INT DEFAULT NULL, DROP vainqueur');
        $this->addSql('ALTER TABLE `match` ADD CONSTRAINT FK_7A5BC505773C35EE FOREIGN KEY (vainqueur_id) REFERENCES user (id)');
        $this->addSql('CREATE INDEX IDX_7A5BC505773C35EE ON `match` (vainqueur_id)');
    }
}
