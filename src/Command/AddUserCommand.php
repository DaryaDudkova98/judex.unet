<?php

namespace App\Command;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

#[AsCommand(
    name: 'app:add-user',
    description: 'Adds a new user to the database',
)]
class AddUserCommand extends Command
{
    public function __construct(
        private EntityManagerInterface $entityManager,
        private UserPasswordHasherInterface $passwordHasher
    ) {
        parent::__construct();
    }

    protected function configure(): void
    {
        $this
            ->addArgument('login', InputArgument::REQUIRED, 'Логин пользователя')
            ->addArgument('password', InputArgument::REQUIRED, 'Пароль пользователя')
            ->addArgument('fullName', InputArgument::REQUIRED, 'ФИО пользователя')
        ;
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);
        
        $login = $input->getArgument('login');
        $password = $input->getArgument('password');
        $fullName = $input->getArgument('fullName');

        // We check if a user with this login exists
        $existingUser = $this->entityManager
            ->getRepository(User::class)
            ->findOneBy(['login' => $login]);
        
        if ($existingUser) {
            $io->error("Пользователь с логином '{$login}' уже существует!");
            return Command::FAILURE;
        }

        // Create a new user
        $user = new User();
        $user->setLogin($login);
        $user->setFullName($fullName);
        $user->setPassword($this->passwordHasher->hashPassword($user, $password));

        // Save to the database
        $this->entityManager->persist($user);
        $this->entityManager->flush();

        $io->success("Пользователь '{$login}' успешно создан!");
        $io->note([
            "Логин: {$login}",
            "ФИО: {$fullName}",
            "Пароль: {$password} (сохраните его!)"
        ]);

        return Command::SUCCESS;
    }
}
