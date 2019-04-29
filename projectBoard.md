# Projectboard definitions 

## `Project backlog` 
Håller user stories innan de blivit estimerade och planerade att genomföras under en sprint. 

### Krav
* Följer user story-mallen
* Har tydliga acceptans kriterier


### Förflyttas till `Sprint Backlog`
* När user storyn "tas med" i nästa sprint under sprint planning. 
* Storyn måste vara estimerad och möjligtvis uppdelad i tasks.
 
 
## `Sprint Backlog`
Håller user stories och tasks planerade att genomföras under pågående sprint. 

### Krav
* Alla user stories och tasks tilldelas label för denna sprint.
  * Kvarvarande user stories och tasks från förra sprinten, ska få båda labels.
* User Story 
  * Listar eventuella tasks
* Task
  * Följer mallen för task


### Förflyttas till `In Progress`
* När en person tar på sig att genomföra tasken/storyn 
  * Personen i fråga assignar sig själv till tasken/storyn 
* När en task flyttas ska även tillhörande Story flyttas
  * Assigna inte dig själv till Storyn
 
 
## `In Progess`
En story eller task som just nu arbetas på.

### Krav
* I största mån försöka att avsluta en påbörjade story/task innan en ny påbörjas.
* I största mån försöka avsluta alla tasks kopplade till en story innan ny story påbörjas.
 
### Förflyttas till `Review` 
* När alla acceptens kriterier och defintion of done är uppfyllda.
* Måste finnas en pull request som uppfyller kraven.
  * Pull requesten ska i kommentaren referera till vilken user story eller task den löser
 
 
## `Review`
En story eller task som väntar på kommentarer.

### Krav

### Förflyttas till `In Progress`  
* Om storyn/tasken kräver förändring ska personerna som är ansvarig för storyn/tasken (assignees) flytta tillbaka den

### Förflyttas till `Done`  
* Person som godkänner ska ha förståelse för vad koden gör, annars lämna kommentar och be om förklaring
  * Vid parprogrammering ska inte den andra parter godkänna
  * Flyttas över av den person som mergar
* Task
  * Klarmarkera tasken i länkad user story
  * Om alla task är avklarade flytta även User storyn 
 
## `Done`
Håller user stories, tasks och pull request som är färdiga. 
