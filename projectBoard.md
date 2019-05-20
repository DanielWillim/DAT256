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
  * __Risk__: Vi har flera oavslutade items vid vår demo.
    * __Diskussion__: Diskuterades vid sprint 4 gruppreflektion
    * __Alternativ__: Om så är fallet kanske vi kan begränsa oss till en story/task assignad per person.
* I största mån försöka avsluta alla tasks kopplade till en story innan ny story påbörjas.
  * Kommentar: För att se till att ha så få storys i genomlöpning som möjligt
 
### Förflyttas till `Review` 
* När alla acceptens kriterier och defintion of done är uppfyllda.
* Måste finnas en pull request som uppfyller kraven.
  * Pull requesten ska i kommentaren referera till vilken user story eller task den löser
 
 
## `Review`
En story eller task som väntar på kommentarer.

### Krav

### Förflyttas till `In Progress`  
* Om storyn/tasken kräver stora förändringar ska personerna som är ansvarig för storyn/tasken (assignees) flytta tillbaka den, annars ligger den kvar i review
  * __Definition "stora förändringar":__ Om det är någor som kräver större ändringar så reviewern inte kan "[sugest an edit](https://help.github.com/en/articles/incorporating-feedback-in-your-pull-request)"
  * Uppdaterat vid efter sprint 4 till att bara flyttas vid stora förändringar, detta då det upplevdes som för mycket over-head att flytta saker fram och tillbaka hela tiden. __Risker__ att aldrig flytta storyn är att det blir otydligt vad som faktiskt läggs tid på just nu
  
### Förflyttas till `Done`  
* Person som godkänner ska ha förståelse för vad koden gör, annars lämna kommentar och be om förklaring
  * Vid parprogrammering ska inte den andra parter godkänna
  * Flyttas över av den person som mergar
* Task
  * Klarmarkera tasken i länkad user story
  * Om alla task är avklarade flytta även User storyn
 
 
## `Done`
Håller user stories, tasks och pull request som är färdiga.
