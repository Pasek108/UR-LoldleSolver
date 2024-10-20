<h1 align="center">UR-LoldleSolver - Readme</h1>
<p align="center">
  <strong>
    Project from my studies at <a href="https://www.ur.edu.pl/pl/kolegia/kolegium-nauk-przyrodniczych">University of Rzeszów (UR)</a>
  </strong>
</p>
<div align="center">
  <a href="https://www.ur.edu.pl/pl/kolegia/kolegium-nauk-przyrodniczych">
    <img src="_for_readme/ur_banner.jpg?">
  </a>
</div>

<br>

## Table of Contents
* [Overview](#overview)
  * [About](#about)
  * [Technologies](#technologies)
  * [Features](#features)
  * [Setup](#setup)
* [Details](#details)
  * [Data sources](#data-sources)
  * [Knowledge Base Structure](#knowledge-base-structure)
    * [Class Descriptions](#class-descriptions)
    * [Attribute Descriptions](#attribute-descriptions)
    * [Relationship Descriptions](#relationship-descriptions)
    * [CNL Diagram](#cnl-diagram)
  * [User interface](#user-interface)
  * [Project structure](#project-structure)
  * [Code organization](#code-organization)

<br>

## Overview

### About
The project involved creating an ontological knowledge base using real-world data. The chosen environment for this task was Ontorion Fluent Editor 2015.

The project focuses on creating a knowledge base about characters from the game League of Legends and using it, along with the Fluent Editor environment, to solve the daily [Loldle game in classic mode](https://loldle.net/classic).

The knowledge base contains around 1,700 sentences written in CNL (Controlled Natural Language), which is a controlled language specific to the Fluent Editor environment. The data includes character names, regions, resources used by the character, attack range, gender, species, release year, and the character's in-game position.

![preview](/_for_readme/preview.png)

----------------------------------

### Technologies
Languages:
- HTML
- CSS
- JS
- SPARQL
  
Programs:
- [FluentEditor](https://www.cognitum.eu/semantics/fluenteditor/)
- [VSCode](https://code.visualstudio.com)
  
----------------------------------

### Features
- Menu starting animation
- Mute/unmute sound
- Menu windows with transitions
- Credits window
- Four levels of difficulty
- Personal and general top 10 leaderboards for each difficulty
- Countdown on game start
- Spawning enemies that can hit players
- Spawning deers that can be hit by enemy or player giving him points
- Three lives for player
- Explosion animation of enemy when it is hit by a player
- Short time protection when enemy hit the player
- Energy points for using slow motion skill
- Points counter
- Player slip and laughing deers animations when player loses all their lives
- Game over screen and game restart without reloading the page

<br>

> [!NOTE]  
> Room for improvements:
> - Ability to stop slowmo skill after atleast 1s (now it runs until it uses up all the energy)
> - Probably rewriting the code (it's an improved version of my old school project and the code is very messy)
> - Fixing some problems:
>   - Game gets faster or slower depending on device framerate
>   - Sometimes the game starts lagging for few seconds and then again goes smoothly
>   - Sometimes on laughing deers animation, the deer next to player's car starts blinking

----------------------------------

### Setup
Ways to run this program: 
1. Use the [live demo](https://pas-artur.000webhostapp.com/deer-killer/)
2. Follow the same steps as for editing the program

To edit this program:
- Download this repo
- Download [XAMPP](https://www.apachefriends.org/pl/index.html)
- Run Apache and MySQL in XAMPP Control Panel
- Move the project to XAMPP's htdocs folder
- Open [phpMyAdmin](http://localhost/phpmyadmin/index.php)
- Click on Import tab
- Choose deerkiller.sql file from PHP folder in project
- Click import button at the bottom of the page
- Open [localhost](http://localhost) and open folder that you previously moved to htdocs
- Start coding

<br>

## Details

### Data sources
The knowledge base for the project was generated automatically using data collected manually from the website [https://loldle.net/classic](https://loldle.net/classic).

The data was collected by manually entering all possible answers for the Loldle game. These include champion names and their attributes, which were then used to automatically populate the knowledge base using a JavaScript script.

----------------------------------

### Knowledge Base Structure

The key elements of the ontological knowledge base are classes, their instances (individuals), and the relationships between these elements. The database has a flat structure, consisting of 7 classes, 6 relations, and 2 attributes.

----------------------------------

#### Class Descriptions
- **Class "gender"** - Describes the gender of characters. Currently, there are 3 genders in the game.

![gender class](/_for_readme/gender_class.png)

- **Class "position"** - Describes the positions a character is currently played in. There are 5 positions in the game, and characters are often played in multiple positions.

![gender class](/_for_readme/position_class.png)

- **Class "resource"** - Describes the resource used by the character in the game. Currently, characters use one of 13 types of resources.

![gender class](/_for_readme/resource_class.png)

- **Class "species"** - Describes the species/race of a character. Characters may belong to one or more of 29 species.

![gender class](/_for_readme/species_class.png)

- **Class "range-type"** - Describes the attack range of a character.

![gender class](/_for_readme/range-type_class.png)

- **Class "region"** - Describes the locations associated with the characters. There are 16 main regions in the game’s lore.

![gender class](/_for_readme/region_class.png)

- **Class "champion"** - Describes the existing champions. There are 167 champions available for players.

![gender class](/_for_readme/champion_class.png)

#### Attribute Descriptions
- **Attribute "released-in"** - Describes the year of a champion's release.
- **Attribute "have-importance"** - Describes the amount of information about a character. This attribute is artificially generated for use in finding the best choice during the Loldle game and does not exist in the game itself.

#### Relationship Descriptions
- **Relation "have-gender"** - Links a character to their gender.
- **Relation "play-in"** - Links a character to the positions they are played in.
- **Relation "use-resource"** - Links a character to the resource they use.
- **Relation "have-range-type"** - Links a character to their attack types.
- **Relation "have-species"** - Links a character to their species.
- **Relation "belong-to"** - Links a character to the regions they are associated with.

#### CNL Diagram
Below is a CNL diagram of the ontological knowledge base. White rectangles represent classes, green rectangles represent class instances or individuals, and black connections signify class containment. Green connections represent user-defined relationships.

![cnl diagram](/_for_readme/CNL_diagram_2.JPG)

----------------------------------

### User interface
#### Main menu
![main menu](/_for_readme/main_menu.png)


----------------------------------

#### Top score
![top_score](/_for_readme/top_score.png)


----------------------------------

#### Credits
![credits](/_for_readme/credits.png)


----------------------------------

#### Difficulty
![difficulty](/_for_readme/difficulty.png)


----------------------------------

#### Game
![game](/_for_readme/game.png)
![game_hit](/_for_readme/game_hit.png)


----------------------------------

#### Game over
![game over](/_for_readme/game_over.png)


----------------------------------

### Project structure
The project directory tree looks like this:
- :file_folder: DeerKiller (project folder)
  - :page_facing_up: *github config*
  - :page_facing_up: *readme file*
  - :page_facing_up: *index.html file*
  - :file_folder: _for_readme - :page_facing_up: *files for readme*
  - :file_folder: Sounds - :page_facing_up: *sounds and music used in project*
  - :file_folder: Images
    - :file_folder: UI - :page_facing_up: *images for user interface*
    - :file_folder: Game - :page_facing_up: *images used in the game*
  - :file_folder: PHP
    - :page_facing_up: *mysql database file*
    - :page_facing_up: *php files for saving and getting the score*
  - :file_folder: Scripts
    - :file_folder: Menu - :page_facing_up: *scripts for menu*
    - :file_folder: Game
      - :page_facing_up: *scripts for game*
      - :file_folder: UI - :page_facing_up: *scripts for user interface in game*
  - :file_folder: Styles
    - :page_facing_up: *css files*
    - :file_folder: fonts - :page_facing_up: *fonts used in the project*

----------------------------------

### Code organization

![program diagram](/_for_readme/program_diagram.png)

> [!WARNING]  
> Classes must be loaded from bottom to the top to avoid situation when class does not exist in the time of its objects creation

Menu is entry of the program.

Menu creates and manages one instance of each of the classes:
- MenuWindow (Credits)
- Difficulty
- TopScore
- Game

Difficulty and TopScore classes are extension of MenuWindow class which is responsible for showing and hiding menu window with transition

Game class creates and manages:
- One instance of RoadBackground class
- Two instances of treesBackground class (left and right side)
- One instance of classes:
  - HealthBar
  - EnergyBar
  - PointsCounter
  - GameOver
- One instance of Player class
- Many instances of classes:
  - Enemy
  - Deer
  - HappyDeer
