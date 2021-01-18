Chicas,

Como siempre, lo primero que quiero hacer es felicitarlas por un excelente trabajo. El diseño esta perfecto, las animaciones muy fluidas, el comportamiento del juego muy bien logrado. Se nota el esfuerzo puesto acá. 

Con respecto al codigo, no voy a enfocarme en el HTML, pero menciono que hay poco enfasis en usar las etiquetas semanticas correspondientes, lo que podria ayudar a mejorarlo. Su CSS esta prolijo, conciso y muy bien hecho, aunque hay algunos problemas de prolijidad (recuerden usar un linter antes de enviarlo, asi todo queda bien escrito. Cosas como ".clase{" no son aceptables). Noten que quedó subido a github un archivo,debug.log, que tiene ciertas configuraciones de errores. A veces se agrega automaticamente. Conviene borrarlo. El README esta correcto, completo y prolijo. 

Con respecto al código, lo veo muy bien. Es fácil seguirlo y entenderlo ya que está correctamente funcionalizado y la mayoria de las veces usan nombres muy claros. Ocasionalmente sbreabundan comentarios y me pregunto si fueron para mi o para ustedes - pero la necesidad de dejarlos me habla de que algunos nombres no estuvieron lo suficientemente pensados. Por ejemplo:

```js
buscarMatches()//busca y borra matches
```

El nombre de una funcion deberia decirme lo que hace. Si necesitan aclarar lo que hace la funcion en su misma definicion, es una pista que indica que el nombre de la funcion no es correcto. buscarYBorrarMatches() en este caso, seria mas correcto, y mas claro. O mejor aun, dividir la funcion en dos: buscarMatches() y borrarMatches(). 

No les digo esto porque espero que lo hagan siempre (mucho menos en esta etapa de su aprendizaje), pero sí para que les sirva de reflexion en futuros codigos. 

Entiendo la decision de dejar las definiciones en cada seccion, pero en ese caso espero que sean consistentes: una seccion, todas las definiciones, y luego todas las funciones. Hay ocasiones (linea 31 por ejemplo) en donde las definiciones parecen estar en esa linea porque sí, sin seguir ninguna regla. La prolijidad es importantisima en trabajos largos. 

Con respecto al producto entregado, tengo que felicitarlas nuevamente porque parece un producto hecho por gente con mucha mas experiencia que ustedes. Me alegra muchisimo que hayan incorporado combos, algo con lo que muchos grupos tuvieron problemas, y lo fluidas de las animaciones. No encontré ningun bug muy evidente jugando con su codigo, lo que habla de que lo probaron correctamente en todas las configuraciones. 

Una de las partes mas dificiles de este tipo de trabajos es superar la etapa de los funcionamientos basicos, para poder pasar a los detalles, que paradijicamente son lo que mas se nota, lo que mas ayuda a que parezca un producto "real" y no un ejercicio academico. Muchas veces quienes estan aprendiendo se dedican a las funcionalidades basicas y olvidan que el producto tendra un usuario. Por darles un ejemplo: ante la falta de tiempo, optaron por dejar afuera que las frutas "cayeran" en lugar de aparecer tras un match. Y esta bien, fue la decision correcta. Pero no dejaron de lado las animaciones de las frutas, no despaarece el foco de los elementos. Su juego se puede jugar - y ese enfasis en el producto terminado cuesta un monton, especialmente cuando no es lo que pedimos en las consignas, especialmente cuando el tiempo falta. Que lo hayan hecho habla muy bien de ustedes: estan pensando como programadoras, y no solo eso, como *buenas* programadoras, que saben que su trabajo no tiene sentido si no tiene en cuenta al usuario. No tengo ninguna duda de que llegaran muy lejos si siguen encarando sus trabajos de esta manera. 

Nota final: 9
