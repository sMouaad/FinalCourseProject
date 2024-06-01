import tensorflow.compat.v1 as tf
from tensorflow import keras 
from tensorflow.keras import models
import pylsl
import numpy as np
import pygame
from pylsl import resolve_stream                  
from EEG_feature_extraction import generate_feature_vectors_from_samples
from flappy import *

# Load the trained model
loaded_model = models.load_model("_focus_model.keras")

# Initialize Pygame
pygame.init()
SCREEN_WIDTH = 288
SCREEN_HEIGHT = 512
screen = pygame.display.set_mode((SCREEN_WIDTH, SCREEN_HEIGHT))
pygame.display.set_caption('Flappy Bird')

# Load images
BACKGROUND = pygame.image.load('assets/sprites/background-day.png')
BACKGROUND = pygame.transform.scale(BACKGROUND, (SCREEN_WIDTH, SCREEN_HEIGHT))
BEGIN_IMAGE = pygame.image.load('assets/sprites/message.png').convert_alpha()
START_BUTTON = pygame.image.load('assets/sprites/button.png').convert_alpha()
START_BUTTON_RECT = START_BUTTON.get_rect(center=(SCREEN_WIDTH // 2, SCREEN_HEIGHT // 2))

# Initialize game objects
bird_group = pygame.sprite.Group()
bird = Bird()
bird.rect.center = (SCREEN_WIDTH // 2, SCREEN_HEIGHT // 2)  # Start bird in the middle
bird_group.add(bird)

ground_group = pygame.sprite.Group()
for i in range(2):
    ground = Ground(GROUND_WIDHT * i)
    ground_group.add(ground)

# Clock for controlling the frame rate
clock = pygame.time.Clock()

# Resolve EEG stream
nr_samples = 1
streams = resolve_stream('type', 'EEG')
inlet = pylsl.stream_inlet(streams[0])

# Bird movement variables
bird_velocity = -10  # Initial velocity
gravity = 0.5      # Gravity to pull the bird down

def start_screen():
    screen.blit(BACKGROUND, (0, 0))
    screen.blit(BEGIN_IMAGE, (120, 150))
    screen.blit(START_BUTTON, START_BUTTON_RECT.topleft)
    pygame.display.update()

def main_game():
    global bird_velocity

    while True:
        clock.tick(60)
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                return

        all_samples = []
        for _ in range(2000 // 4):  # Collecting samples
            sample, timestamp = inlet.pull_sample()
            sample.pop()  # Removing the last element
            all_samples.append([timestamp] + sample)

        all_samples = np.array(all_samples)
        vector, header = generate_feature_vectors_from_samples(all_samples, nsamples=150, period=1., remove_redundant=True)
        predictions = loaded_model.predict(vector)

        for prediction in predictions:
            predicted_class = np.argmax(prediction)
            if predicted_class == 2:
                bird.rect.y = SCREEN_HEIGHT // 2  # Keep bird in the middle for concentrating state
                bird_velocity = 0
                bird.bump()
                pygame.mixer.music.load(wing)
                pygame.mixer.music.play()
                print("concentrating - bird_velocity set to 0")
            elif predicted_class == 1:
                bird_velocity = gravity  # Downward velocity
                print("neutral - bird_velocity set to gravity")
            elif predicted_class == 0:
                bird_velocity = -gravity  # Upward velocity
                print("relaxed - bird_velocity set to -gravity")

        # Debugging output
        print(f"bird_velocity: {bird_velocity}, bird.rect.y: {bird.rect.y}")

        # Update bird's position based on velocity
        bird.rect.y += bird_velocity

        screen.blit(BACKGROUND, (0, 0))
        if is_off_screen(ground_group.sprites()[0]):
            ground_group.remove(ground_group.sprites()[0])
            new_ground = Ground(GROUND_WIDHT - 20)
            ground_group.add(new_ground)

        bird_group.update()
        ground_group.update()

        bird_group.draw(screen)
        ground_group.draw(screen)

        pygame.display.update()

        if pygame.sprite.groupcollide(bird_group, ground_group, False, False, pygame.sprite.collide_mask):
            pygame.mixer.music.load('assets/audio/hit.wav')
            pygame.mixer.music.play()
            pygame.time.wait(1000)
            return



# Main loop
game_running = True
while game_running:
    start_screen()
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            game_running = False
        elif event.type == pygame.MOUSEBUTTONDOWN:
            if START_BUTTON_RECT.collidepoint(event.pos):
                main_game()
pygame.quit()
