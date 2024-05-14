import tensorflow.compat.v1 as tf
from tensorflow import keras 
from tensorflow.keras import models
import pylsl
import numpy as np
import pandas as pd
from pylsl import resolve_stream                  
from EEG_feature_extraction import generate_feature_vectors_from_samples
from flappy import *


loaded_model = models.load_model("_focus_model.keras")

pygame.init()
screen = pygame.display.set_mode((SCREEN_WIDHT, SCREEN_HEIGHT))
pygame.display.set_caption('Flappy Bird')

BACKGROUND = pygame.image.load('assets/sprites/background-day.png')
BACKGROUND = pygame.transform.scale(BACKGROUND, (SCREEN_WIDHT, SCREEN_HEIGHT))
BEGIN_IMAGE = pygame.image.load('assets/sprites/message.png').convert_alpha()

bird_group = pygame.sprite.Group()
bird = Bird()
bird_group.add(bird)

ground_group = pygame.sprite.Group()

for i in range (2):
    ground = Ground(GROUND_WIDHT * i)
    ground_group.add(ground)

"""pipe_group = pygame.sprite.Group() 
for i in range (2):
    pipes = get_random_pipes(SCREEN_WIDHT * i + 800)
    pipe_group.add(pipes[0])
    pipe_group.add(pipes[1])"""



clock = pygame.time.Clock()


nr_samples = 1
streams = resolve_stream('type', 'EEG')                         # create a new inlet to read # from the stream
inlet = pylsl.stream_inlet(streams[0])

begin = True

while begin:
    clock.tick(15)

    for iter in range (nr_samples):
        all_samples = []
        for i in range (4000 // 4):                                                 # 2000 ms = 2 secs, 4 EEG-electrodes (channels)
            sample, timestamp = inlet.pull_sample()
            sample.pop()
            all_samples.append([timestamp]+sample)

        all_samples = np.array(all_samples)
        vector, header= generate_feature_vectors_from_samples(all_samples, nsamples = 150, period = 1., remove_redundant = True)
        predictions = np.array(list(map(lambda x: np.argmax(x), loaded_model.predict(vector))))


        for event in pygame.event.get():
            if event.type == QUIT:
                pygame.quit()

        for prediction in predictions:       
            if prediction == 2 :
                print("concentrating")
                bird.bump()
                pygame.mixer.music.load(wing)
                pygame.mixer.music.play()
                begin = False
            elif prediction == 1 :
                print("neutral")
            elif prediction == 0 :
                print("relaxed")


            screen.blit(BACKGROUND, (0, 0))
            screen.blit(BEGIN_IMAGE, (120, 150))

            if is_off_screen(ground_group.sprites()[0]):
              ground_group.remove(ground_group.sprites()[0])

            new_ground = Ground(GROUND_WIDHT - 20)
            ground_group.add(new_ground)

            bird.begin()
            ground_group.update()

            bird_group.draw(screen)
            ground_group.draw(screen)

            pygame.display.update()


while True:

    clock.tick(15)

    for iter in range (nr_samples):
        all_samples = []
        for i in range (2000 // 4):                                                 # 2000 ms = 2 secs, 4 EEG-electrodes (channels)
            sample, timestamp = inlet.pull_sample()
            sample.pop()
            all_samples.append([timestamp]+sample)

        all_samples = np.array(all_samples)
        vector, header= generate_feature_vectors_from_samples(all_samples, nsamples = 150, period = 1., remove_redundant = True)
        predictions = loaded_model.predict(vector)


        for event in pygame.event.get():
            if event.type == QUIT:
                pygame.quit()


        for prediction in predictions:       
            if prediction == 0 :
                print("concentrating")
                bird.bump()
                pygame.mixer.music.load(wing)
                pygame.mixer.music.play()
                begin = False
            elif prediction == 1 :
                print("neutral")
            elif prediction == 2 :
                print("relaxed")


            screen.blit(BACKGROUND, (0, 0))

            if is_off_screen(ground_group.sprites()[0]):
                ground_group.remove(ground_group.sprites()[0])
    
                new_ground = Ground(GROUND_WIDHT - 20)
                ground_group.add(new_ground)

            """if is_off_screen(pipe_group.sprites()[0]):
            pipe_group.remove(pipe_group.sprites()[0])
            pipe_group.remove(pipe_group.sprites()[0])

            pipes = get_random_pipes(SCREEN_WIDHT * 2)

            pipe_group.add(pipes[0])
            pipe_group.add(pipes[1])"""

            bird_group.update()
            ground_group.update()
            #pipe_group.update()

            bird_group.draw(screen)
           # pipe_group.draw(screen)
            ground_group.draw(screen)

            pygame.display.update()

            if (pygame.sprite.groupcollide(bird_group, ground_group, False, False, pygame.sprite.collide_mask)):
                pygame.mixer.music.load(hit)
                pygame.mixer.music.play()
                time.sleep(1)
                break


