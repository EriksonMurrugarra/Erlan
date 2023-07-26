var eTutorial=[];
eTutorial[0]="# BASES DEL LENGUAJES\n\n"+  
"// ...........................................\n\n"+
"    # PALABRAS RESERVADAS        \n\n"+
"        # Bloque principal del programa\n"+
"            inicio // sentencia inicial del programa\n"+
"            fin    // sentencia final del programa\n"+
"        # Entrada y Salida de Datos\n"+
"            preguntar // Asignar valor a una variable\n"+
"            responder // Enviar datos de respuesta por pantalla\n"+
"            alertar   // Alertar datos de respuesta por pantalla\n"+
"            mostrar   // Mostrar         \n"+
"        # Estructuras    \n"+
"        # Condicional\n"+
"            si\n"+
"            sino\n"+
"            finsi\n"+
"            con\n"+
"            or\n"+
"            and\n"+
"            no\n"+
"            VERDAD\n"+
"            FALSO\n"+
"            # palabras de comparación\n"+
"                soniguales\n"+
"                sondiferentes\n"+
"                esmayor\n"+
"                esmenor\n"+
"                esmayorigual\n"+
"                esmenorigual\n"+
"                esverdad\n"+
"                esfalso\n"+
"        # Repetitivas\n"+
"            repetir\n"+
"            mientras";


eTutorial[1]="# SECUENCIA BASICA\n"+
"inicio\n"+    
"    mostrar \"HOLA\"\n"+
"    alertar \"QUE TAL\"\n"+
"    responder \"TODO BIEN?\"\n"+
"\n"+    
"    # VARIABLES \n"+   
"    a=10\n"+
"    b=20\n"+
"    suma=a+b\n"+
"    responder \"La suma es @suma\" # donde @suma es el valor de la variable\n"+
"\n"+    
"    # CONCATENAR CADENAS    \n"+
"    nombre=\"Erikson Haziz\"\n"+
"    apellido=\"Murrugarra Sifuentes\"\n"+
"    programa=\"ErLAN\"\n"+
"    texto=\"Hola soy @nombre @apellido y soy el creador de @programa\"\n"+
"    alertar \"@texto\"\n"+
"fin";

eTutorial[2]="# LECTURA DE DATOS\n"+
"# usamos la palabra clave preguntar y lo asignamos a una variable \n"+
"inicio\n"+	
"    numero1=preguntar \"Ingresa un número: \"\n"+
"    numero2=preguntar \"Ingresa otro número: \"\n"+    
"    suma = numero1 + numero2    \n"+
"    responder \"La suma es: @suma\"\n"+
"    \n"+
"    nombre=preguntar \"Hola. Como te llamas?\"\n"+
"    mostrar \"Hola Bienvenido @nombre\"\n"+
"    \n"+
"    cad1=\"Laboratorios\"\n"+
"    cad2=\"Erikson\"\n"+
"    empresa=\"@cad1 @cad2\"\n"+
"    responder \"a @empresa\"\n"+
"fin";

eTutorial[3]="# CONDICIONES SIMPLES\n"+
"inicio\n"+
"    edad = preguntar \"¿Hola cual es tu edad?\"\n"+    
"    si esmenorigual(edad con 18):\n"+
"        alertar \"Eres menor de edad\"\n"+
"    sino:\n"+
"        mostrar \"Eres Mayor de edad\"\n"+
"    finsi\n"+
"\n"+    
"    #OTRO EJEMPLO\n"+
"    \n"+
"    nombre=\"Erikson\"\n"+
"    nombre2=\"Franchesca\"  # el nombre de mi hermanita menor\n"+
"    nombre3=\"Sayury\"      # el nombre de mi hermana mayor\n"+
"        \n"+
"    si soniguales(nombre con nombre2):\n"+
"        responder \"Nombre y nombre2 son iguales\"\n"+
"    sino:\n"+
"        si soniguales(nombre2 con nombre3):\n"+
"            responder \"Son iguales nombre2 con nombre3\"\n"+
"        sino:\n"+
"            alertar \"No se parecen\"\n"+
"        finsi\n"+
"    finsi\n"+
"    \n"+
"fin";

eTutorial[4]="# CONDICIONES SIMPLES\n"+
"inicio\n"+
"    \n"+
"    numero=1    \n"+
"    si soniguales(numero con 1) or soniguales(numero con 2) :\n"+
"        responder \"Genial\"\n"+
"    sino:\n"+
"        alertar \"Mal\"\n"+
"    finsi\n"+
"    \n"+
"    # otro ejemplo    \n"+
"    si soniguales(numero con 2) or soniguales(( soniguales(1 con 1)) con VERDAD):\n"+
"        alertar \":D\"\n"+
"    sino:\n"+
"        alertar \"XXXD\"\n"+
"    finsi \n"+
"fin";

eTutorial[5]="# ESTRUCTURA REPETITIVA\n"+
"inicio\n"+
"    \n"+
"    contador=1    \n"+
"    repetir:        \n"+
"        residuo=contador % 2\n"+
"        responder \"@contador\"\n"+
"        \n"+
"        si soniguales(residuo con 0):\n"+
"            mostrar \"Número Par\"\n"+
"        sino:\n"+
"            alertar \"Número Impar\"\n"+
"        finsi        \n"+
"        contador=contador+1       \n"+ 
"    mientras esmenorigual(contador con 10) \n"+       
"fin";


function showTutorial(index){
	textAce.setValue(eTutorial[index]);
}