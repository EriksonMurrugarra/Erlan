/*
  Erikson Murrugarra Sifuentes.
  https://eriksonmurrugarra.tech
*/

var eTp = 
{
	alertar: '<div class="erlan-control elements"><img src="images/erlan_head.png"/><div class="alert">@text<div></div>',
	mostrar: '<div class="erlan-control elements"><img src="images/erlan_head.png"/><div class="show">@text<div></div>',
	responder: '<div class="erlan-control elements"><img src="images/erlan_head.png"/><div class="response">@text<div></div>',
	preguntar: '<div class="erlan-control elements"><img src="images/erlan_head.png"/><div><div class="pregunta elements">'+
             '<label>@text</label> </div></div></div>'+
             '<div class="erlan-control elements pregunta-respuesta"><section></section>'+
             '<div class="elements2">' + 
              '<input id="@inputId" type="text" class="entrada" /> '+
              '<button id="@btnId">↵</button><br/> <span style="color: #555;font-weight:normal !important;"> Click! o tecla Enter'+
             '</div></div>',
	error: '<a class="btne error" onclick="textAce.gotoLine(@line)">'+
		     '<span>Ln. @line: </span><span>@text.</span></a>'
}

var eUtils = 
{
	replaceAll: function(find, replace, str)
  {		
  	return str.replace(new RegExp(find, 'g'), replace);	
	}
}

var DEBUG = false;

function log(message) {
  if (DEBUG)
  {
    console.log(message);
  }
}

let isAsking = false;

var eCs = 
{
	   __INICIO__ : 1000,
	      __FIN__ : 2000,
	 __PREGUNTA__ : 3000,
	 __RESPONDE__ : 4000,
	   __GUARDA__ : 5000,
	   __ALERTA__ : 6000,
	        __Y__ : 7000,
	        __O__ : 0x0008,
	      __CON__ : 0x0009,
	     __SINO__ : 0x000A,
	    __FINSI__ : 0x00A1,
	   __VERDAD__ : 0x00A2,
	    __FALSO__ : 0x00A3,
	       __NO__ : 0x00A4,
	  __REPETIR__ : 0x00A5,
	 __MIENTRAS__ : 0x00A6,
	    __HACER__ : 0x00A4,
	  __MOSTRAR__ : 0x00BB,
    __SELECCIONAR__: 0x00B1,
    __RANDOM__: 0x00FF1,
    __HASTA__: 0x00FF2,
    __CASO__: 0x00B2,
    __BREAK__: 0x00B3,
    __FINSELECCIONAR__: 0x00B4,
	       __CADENA__  : 100,
	 __IDENTIFICADOR__ : 101,
	 	    __NUMERO__ : 102,
	 __IGUAL__ : 200,
	  __DPTS__ : 201,
	 __PARIZ__ : 300,
	 __PARDE__ : 301,
	  __LLIZ__ : 302,
	  __LLDE__ : 303,
	   __MAS__ : 304,
	   __POR__ : 305,
	   __MEN__ : 306,
	   __DIV__ : 307,
	   __RES__ : 308,
	            __SI__ : 400,
	   __SONIGUALES__  : 401,
	 __SONDIFERENTES__ : 402,
	       __ESMAYOR__ : 403,
	       __ESMENOR__ : 404,
	  __ESMAYORIGUAL__ : 405,
	  __ESMENORIGUAL__ : 406,
	       __ESFALSO__ : 407,
	      __ESVERDAD__ : 408,
	      __MICHI__: 500
}

var Erikson = function ()
{
	return {
		eIndex:  0x0000,
		eLine:   0x0001,
		eString: '',
		eLength: 0x0000,
		eFollow: true, /* Indica que se puede seguir con la ejecución del programa *T
		/* memoria */
		eResults: undefined, /* donde poner los resultados label */
		ePasada: 0x0001, /* pasadas del interprete 1. sintaxis 2. ejecucion*/
		eErrorLog: '',
		eErrorer: undefined,
		eErrContent: undefined,
    isAsking: false,
		Memory: 
    {
			eEntry: [],
			fnEriksonDeallocateMemory: function()
      {				
				this.eEntry = [];
				log("Memoria iniciada");
			},
			fnEriksonAddEntry: function(key, value)
      {
        let dataType = "string";

        if (!isNaN(parseInt(value)))
        {
          dataType = "number";
          value = parseInt(value);
        }

				this.eEntry[key] = {value};        
			},
			fnEriksonGetEntry: function(key)
      {
				return this.eEntry[key];
			}
		},
		SymTab: 
    { 
			eKeywords: [],	
			oAsciiTab: [],	
			fnEriksonLoadTable: function()
      {
				this.eKeywords["inicio"]    	= eCs.__INICIO__;
				this.eKeywords["fin"]       	= eCs.__FIN__;
				this.eKeywords["preguntar"]   	= eCs.__PREGUNTA__;
				this.eKeywords["responder"]   	= eCs.__RESPONDE__;
				this.eKeywords["guarda"]    	= eCs.__GUARDA__;
				this.eKeywords["alertar"]   	= eCs.__ALERTA__;
				this.eKeywords["si"]      		= eCs.__SI__;
				this.eKeywords["soniguales"]  	= eCs.__SONIGUALES__;
				this.eKeywords["sondiferentes"] = eCs.__SONDIFERENTES__;  
				this.eKeywords["esmayor"]       = eCs.__ESMAYOR__;
				this.eKeywords["esmenor"]       = eCs.__ESMENOR__;
				this.eKeywords["esmayorigual"]  = eCs.__ESMAYORIGUAL__;
				this.eKeywords["esmenorigual"]  = eCs.__ESMENORIGUAL__;
				this.eKeywords["esverdad"]     	= eCs.__ESVERDAD__;
				this.eKeywords["esfalso"]     	= eCs.__ESFALSO__;
				this.eKeywords["VERDAD"]    	= eCs.__VERDAD__;
				this.eKeywords["FALSO"]     	= eCs.__FALSO__;
				this.eKeywords["con"]       	= eCs.__CON__;
				this.eKeywords["or"]       		= eCs.__O__;
				this.eKeywords["and"]       	= eCs.__Y__;
				this.eKeywords["sino"]      	= eCs.__SINO__;
				this.eKeywords["finsi"]     	= eCs.__FINSI__;
				this.eKeywords["no"]      		= eCs.__NO__;
				this.eKeywords["repetir"]     	= eCs.__REPETIR__;
				this.eKeywords["mientras"]    	= eCs.__MIENTRAS__;
				this.eKeywords["hacer"]     	= eCs.__HACER__;
				this.eKeywords["mostrar"]     	= eCs.__MOSTRAR__;
        this.eKeywords["seleccionar"]     	= eCs.__SELECCIONAR__;
        this.eKeywords["caso"]     	= eCs.__CASO__;
        this.eKeywords["fincaso"]     	= eCs.__BREAK__;
        this.eKeywords["finseleccionar"]     	= eCs.__FINSELECCIONAR__;
        this.eKeywords["aleatorio"]     	= eCs.__RANDOM__;
        this.eKeywords["hasta"]     	= eCs.__HASTA__;
		 	  log("Tabla de Simbolos Iniciada");
		 	  
        this.oAsciiTab["="] = eCs.__IGUAL__;
				this.oAsciiTab["("] = eCs.__PARIZ__;
				this.oAsciiTab[")"] = eCs.__PARDE__;
				this.oAsciiTab["]"] = eCs.__LLDE__;
				this.oAsciiTab["["] = eCs.__LLIZ__;
				this.oAsciiTab[":"] = eCs.__DPTS__;
				this.oAsciiTab["+"] = eCs.__MAS__;
				this.oAsciiTab["*"] = eCs.__POR__;
				this.oAsciiTab["-"] = eCs.__MEN__;
				this.oAsciiTab["/"] = eCs.__DIV__;
				this.oAsciiTab["%"] = eCs.__RES__; 
				this.oAsciiTab["#"] = eCs.__MICHI__; 
				log("Tabla Ascii Iniciada");
			},
			fnSearch: function(string)
      {
				if (this.eKeywords[string] == undefined) 
        {
					this.eKeywords[string] = eCs.__IDENTIFICADOR__;
        }
				return this.eKeywords[string];
			}
		},		
		/* Interprete del sistema */
		Interpreter:
    { 
			eErikson: undefined,
			eSuccess: true,
			eRequireLimits: true,		/* poner inicio y fin */				
			/* Analizador Léxico */
			LexicalAnalyzer: 
      {
				eErikson: undefined,
				fnEriksonInitLexicalAnalizer: function(erikson)
        {
					this.eErikson = erikson;
					log("Analizador léxico iniciado");
				},
				fnEriksonAnalex: function()
        { 
					var eChar = "";
					var eLexema = "";

					while (this.eErikson.eIndex < this.eErikson.eLength)
          {
						eChar = this.efnGetChar();
						
						if (this.efnEsCaracter(eChar))
            {
							do
              {
								eLexema += eChar;							
							}
							while (this.efnEsCaracterNumUnderline((eChar = this.efnGetChar())));
							this.efnBackChar();

							return this.efnCreateToken(eLexema, this.eErikson.SymTab.fnSearch(eLexema))
						}
						else if (eChar == ' ' || eChar == '\t') 
            {
              ;
            }
						else if (eChar == '\n')
            {
							this.eErikson.eLine++;
						}
						else if (!isNaN(eChar))
            {
							var numero = "";
							do
              {
								numero += eChar;
							}
							while(!isNaN((eChar=this.efnGetChar())));
							this.efnBackChar();

							return this.efnCreateToken(eLexema, eCs.__NUMERO__, parseInt(numero));
						}
						else if (eChar == '#')
            {
							while((eChar = this.efnGetChar()) != '\n')
              {
                ; // pass
              }
							this.eErikson.eLine++;
						}
						else if (eChar == '\"')
            {
							eLexema = "";

							while ((eChar=this.efnGetChar())!='\"')
              {
								eLexema += eChar;
							}

							return this.efnCreateToken(eLexema, eCs.__CADENA__);
						}
						else
            {
							return this.efnCreateToken(eChar, this.eErikson.SymTab.oAsciiTab[eChar]);
						}
					}
				},
				efnCreateToken: function(lexema, value, number)
        {
					return {
						'lexema': lexema,
						'valor' : value,
						'numero': number,
						'cadena': lexema,
            'type': (number === undefined) ? "string": "number",
            'value': (number === undefined) ? lexema: number,
					};
				},
				efnGetChar: function()
        {			
					var tmp = this.eErikson.eString[this.eErikson.eIndex];
					this.eErikson.eIndex++;

					return tmp;
				},
				efnEsCaracter: function (c) 
        {
					return (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z');
				},
				efnEsCaracterNumUnderline: function(c)
        {
					return this.efnEsCaracter(c) || (c >= '0' && c <= '9') || c === "_";
				},
				efnBackChar: function()
        {
					this.eErikson.eIndex--;
				}
			},
			SintacticAnalyzer: 
      {
				eErikson: undefined,
				eToken: undefined,
				fnEriksonInitSintacticAnalyzer: function(erikson)
        {
					this.eErikson = erikson;
					log("Analizador Sintáctico Iniciado");
				},
				fnEriksonAnalsin: function()
        {
					this.eToken = this.eErikson.Interpreter.LexicalAnalyzer.fnEriksonAnalex();
				
					if(this.eErikson.Interpreter.eRequireLimits)
          {
						this.fnErikson(eCs.__INICIO__);
          }
					this.Syntax.fnEriksonInitSyntax(this);

					return this.eErikson.Interpreter.eSuccess;
				},
				Syntax: 
        {
					eTree: undefined,
					ePasada: 0,
					eCodeGen: undefined,
					eProgramsFunctions: [],
					fnEriksonInitSyntax: function(tree)
          {
						this.eTree = tree;
						this.ePasada = this.eTree.eErikson.ePasada;						
						this.eCodeGen = this.eTree.eErikson.Interpreter.CodeGenerator;						
						this.fnEriksonProgram(true, this.ePasada == 0x0001);												
					},
					fnEriksonProgram: function(ejecuta, first)
          { 
						switch (this.fnToken().valor)
            {
							case eCs.__ALERTA__:
              {
								this.flowEriksonAlerta(ejecuta, first);
								this.fnEriksonProgram(ejecuta, first);
              }
							break
              ;
							case eCs.__MOSTRAR__:
              {
								this.flowEriksonMostrar(ejecuta, first);
								this.fnEriksonProgram(ejecuta, first);
              }
              break
              ;
							case eCs.__RESPONDE__:
              {
								this.flowEriksonResponde(ejecuta, first);
								this.fnEriksonProgram(ejecuta, first);
              }
							break
              ;
							case eCs.__IDENTIFICADOR__:				
              {
								this.flowEriksonAsignacion(ejecuta, first);								
              }
              break
              ;
							case eCs.__SI__:
              {
								this.flowEriksonCondicional(ejecuta, first);
								this.fnEriksonProgram(ejecuta, first);
              }
              break
              ;
							case eCs.__REPETIR__:
              {
								this.flowEriksonRepetir(ejecuta, first);
								this.fnEriksonProgram(ejecuta, first);
              }
              break
              ;		
              case eCs.__SELECCIONAR__:
              {
								this.flowEriksonEvaluar(ejecuta, first);
								this.fnEriksonProgram(ejecuta, first);
              }
              break
              ;		
							case eCs.__FIN__:
              {
								if (this.eTree.eErikson.Interpreter.eRequireLimits) 
                {
									this.fnTree().fnErikson(eCs.__FIN__);
                }
              }
							break
              ;
						}
					},
					flowEriksonRepetir: function(ejecuta, first)
          {
						this.eTree.fnErikson(eCs.__REPETIR__);												
						this.eTree.fnErikson(eCs.__DPTS__);	
						var i = this.fnTree().eErikson.eIndex;
						var valor;
            var cToken = this.eTree.eToken;			

						do
            {	
							this.fnEriksonProgram(ejecuta, first);
              console.log("flowEriksonRepetir", isAsking)
              // if (isAsking)
              // {
              //   continue;
              // }
                console.log("repite")
                this.eTree.fnErikson(eCs.__MIENTRAS__);
                valor = this.fnExpresionCondicion(first);
                if (valor == true)
                {
                  this.eTree.eToken = cToken;
                  this.fnTree().eErikson.eIndex = i;								
                }	
						}
            while (valor == true && !first);
					},
          flowEriksonEvaluar: function(ejecuta, first)
          {
            this.eTree.fnErikson(eCs.__SELECCIONAR__);
            this.eTree.fnErikson(eCs.__PARIZ__);
        
            let token = this.fnToken();
            let inEvaluationValue = this.eTree.eErikson.Memory.fnEriksonGetEntry(token.lexema);

            this.eTree.fnErikson(eCs.__IDENTIFICADOR__);
            this.eTree.fnErikson(eCs.__PARDE__);	
            this.eTree.fnErikson(eCs.__DPTS__);

            let noSelectionExecuted = true;
        
            do 
            {
              this.eTree.fnErikson(eCs.__CASO__);
              let casoValue = this.fnToken();

              this.eTree.fnErikson(eCs.__CADENA__, eCs.__NUMERO__);
              this.eTree.fnErikson(eCs.__DPTS__);	
              
              let compareCaso = (!first && ejecuta && inEvaluationValue.value == casoValue.value);

              if (noSelectionExecuted && compareCaso)
              {
                noSelectionExecuted = false;
              }

              this.fnEriksonProgram(compareCaso, first);
              
              this.eTree.fnErikson(eCs.__BREAK__);
            } 
            while (this.fnToken().valor === eCs.__CASO__);
            
            if (this.fnToken().valor == eCs.__SINO__)
            {
							this.eTree.fnErikson(eCs.__SINO__);
							this.eTree.fnErikson(eCs.__DPTS__);
							this.fnEriksonProgram(noSelectionExecuted, first);
						}

            this.eTree.fnErikson(eCs.__FINSELECCIONAR__);		
          },
					flowEriksonCondicional: function(ejecuta, first)
          {
						this.eTree.fnErikson(eCs.__SI__);
						
						var valor = this.fnExpresionCondicion(first);								

						this.eTree.fnErikson(eCs.__DPTS__);						
						this.fnEriksonProgram(valor, first);
						
            if (this.fnToken().valor == eCs.__SINO__)
            {
							this.eTree.fnErikson(eCs.__SINO__);
							this.eTree.fnErikson(eCs.__DPTS__);
							this.fnEriksonProgram(valor == false, first);
						}
						this.eTree.fnErikson(eCs.__FINSI__);
					},
					fnExpresionCondicion: function(first)
          {	
						var valor = this.fnTerminoCondicion(first);
						var resultado;
						
						while (this.fnToken().valor == eCs.__Y__ || 
                   this.fnToken().valor == eCs.__O__)
            {
							switch (this.fnToken().valor)
              {
								case eCs.__Y__:
                {
									this.eTree.fnErikson(eCs.__Y__);
									resultado = this.fnTerminoCondicion(first);
									valor = (valor && resultado);
                }
								break
                ;
								case eCs.__O__:
                {
									this.eTree.fnErikson(eCs.__O__);
									resultado = this.fnTerminoCondicion(first);
									valor = (valor || resultado);
                }
                break
                ;
							}
						}
						return (first ? false : valor);
					},
					fnTerminoCondicion: function(first)
          {						
						var valor1, valor2, valor;	
				
						while (this.fnToken().valor==eCs.__SONIGUALES__ ||
							  this.fnToken().valor==eCs.__SONDIFERENTES__ ||
							  this.fnToken().valor==eCs.__ESMENOR__ ||
							  this.fnToken().valor==eCs.__ESMAYOR__ ||
							  this.fnToken().valor==eCs.__ESMENORIGUAL__ ||
							  this.fnToken().valor==eCs.__ESMAYORIGUAL__ ||
							  this.fnToken().valor==eCs.__ESVERDAD__ ||
							  this.fnToken().valor==eCs.__ESFALSO__ ||
							  this.fnToken().valor==eCs.__NO__)
            {
							switch (this.fnToken().valor)
              {
								case eCs.__SONIGUALES__:
                {
									this.eTree.fnErikson(eCs.__SONIGUALES__);
									this.eTree.fnErikson(eCs.__PARIZ__);
									valor1 = this.fnFactorCondicion(first);
									this.eTree.fnErikson(eCs.__CON__);
									valor2 = this.fnFactorCondicion(first);
									valor = (valor1 == valor2);
									this.eTree.fnErikson(eCs.__PARDE__);
                }
								break
                ;
								case eCs.__SONDIFERENTES__:
                {
									this.eTree.fnErikson(eCs.__SONDIFERENTES__);
									this.eTree.fnErikson(eCs.__PARIZ__);
									valor1 = this.fnFactorCondicion(first);
									this.eTree.fnErikson(eCs.__CON__);
									valor2 = this.fnFactorCondicion(first);
									valor = (valor1 != valor2);
									this.eTree.fnErikson(eCs.__PARDE__);
                }
								break
                ;
								case eCs.__ESMAYOR__:
                {
									this.eTree.fnErikson(eCs.__ESMAYOR__);
									this.eTree.fnErikson(eCs.__PARIZ__);
									valor1 = this.fnFactorCondicion(first);
									this.eTree.fnErikson(eCs.__CON__);
									valor2 = this.fnFactorCondicion(first);
									valor = (valor1 > valor2);
									this.eTree.fnErikson(eCs.__PARDE__);
                }
								break
                ;
								case eCs.__ESMENOR__:
                {
									this.eTree.fnErikson(eCs.__ESMENOR__);
									this.eTree.fnErikson(eCs.__PARIZ__);
									valor1 = this.fnFactorCondicion(first);
									this.eTree.fnErikson(eCs.__CON__);
									valor2 = this.fnFactorCondicion(first);
									valor = (valor1 < valor2);
									this.eTree.fnErikson(eCs.__PARDE__);
                }
								break
                ;
								case eCs.__ESMAYORIGUAL__:
                {
									this.eTree.fnErikson(eCs.__ESMAYORIGUAL__);
									this.eTree.fnErikson(eCs.__PARIZ__);
									valor1 = this.fnFactorCondicion(first);
									this.eTree.fnErikson(eCs.__CON__);
									valor2 = this.fnFactorCondicion(first);
									valor = (valor1 >= valor2);
									this.eTree.fnErikson(eCs.__PARDE__);
                }
								break
                ;
								case eCs.__ESMENORIGUAL__:
                {
									this.eTree.fnErikson(eCs.__ESMENORIGUAL__);
									this.eTree.fnErikson(eCs.__PARIZ__);
									valor1 = this.fnFactorCondicion(first);
									this.eTree.fnErikson(eCs.__CON__);
									valor2 = this.fnFactorCondicion(first);
									valor = (valor1 <= valor2);
									this.eTree.fnErikson(eCs.__PARDE__);
                }
								break
                ;
								case eCs.__ESVERDAD__:
                {
									this.eTree.fnErikson(eCs.__ESVERDAD__);
									this.eTree.fnErikson(eCs.__PARIZ__);
									valor1 = this.fnFactorCondicion(first);									
									this.eTree.fnErikson(eCs.__PARDE__);
									valor = (valor1 == true);
                }
								break
                ;	
								case eCs.__ESFALSO__:
                {
									this.eTree.fnErikson(eCs.__ESFALSO__);
									this.eTree.fnErikson(eCs.__PARIZ__);
									valor1 = this.fnFactorCondicion(first);									
									this.eTree.fnErikson(eCs.__PARDE__);
									valor = (valor1 == false);
                }	
                break
                ;	
								case eCs.__NO__:
                {
									this.eTree.fnErikson(eCs.__NO__);
									this.eTree.fnErikson(eCs.__PARIZ__);
									valor1 = this.fnFactorCondicion(first);									
									this.eTree.fnErikson(eCs.__PARDE__);
									valor = (valor1 == false);
                }
								break
                ;
							}
						}
						return valor;
					},
					fnFactorCondicion: function(first)
          {
						var valor;						
						switch (this.fnToken().valor)
            {
							case eCs.__PARIZ__:
              {
								this.eTree.fnErikson(eCs.__PARIZ__);
								valor = this.fnExpresionCondicion(first);
								this.eTree.fnErikson(eCs.__PARDE__);
              }	
              break
              ;	
							case eCs.__NUMERO__:
              {
								valor = this.fnToken().numero;
								this.eTree.fnErikson(eCs.__NUMERO__);
              }
							break
              ;
							case eCs.__IDENTIFICADOR__:
              {
                if (!first) 
                {					
                  valor = this.eTree.eErikson.Memory.fnEriksonGetEntry(this.fnToken().lexema).value;
                } 
                this.eTree.fnErikson(eCs.__IDENTIFICADOR__);		
              }						
              break
              ;
							case eCs.__CADENA__:
              {
								valor = this.fnToken().cadena;
								this.eTree.fnErikson(eCs.__CADENA__);
              }
							break
              ;
							case eCs.__VERDAD__:
              {
								valor = true;
								this.eTree.fnErikson(eCs.__VERDAD__);
              }
							break
              ;
							case eCs.__FALSO__:
              {
								valor = false;
								this.eTree.fnErikson(eCs.__FALSO__);
              }
							break
              ;
						}						
						return valor;
					},
					flowEriksonMostrar: function(ejecuta, first)
          {
						this.eTree.fnErikson(eCs.__MOSTRAR__);
						var cad = this.fnToken().cadena;
						this.eTree.fnErikson(eCs.__CADENA__);						
						
						if (ejecuta && !first) 
            {
							this.eCodeGen.fnEriksonExecMostrar(this.flowEriksonParseString(cad));
            }
					},
					flowEriksonAlerta: function(ejecuta, first)
          {						
						this.eTree.fnErikson(eCs.__ALERTA__);
						var cad = this.fnToken().cadena;
						this.eTree.fnErikson(eCs.__CADENA__);						
						
						if (ejecuta && !first)
            {
							this.eCodeGen.fnEriksonExecAlertar(this.flowEriksonParseString(cad));
            }
					},	
					flowEriksonParseString: function(lexema)
          {						
						var resp = lexema;	
						var i = lexema.indexOf("@"); // primera coincidencia						
						var tmp = "";
						var j;
						var foll = true;
						if (i != -1)
            {
							while (i != -1)
              {
                foll = true;
                tmp = "";
                j = i + 1;
                while ((j < lexema.length) && foll)
                {
                  if (this.eTree.eErikson.Interpreter.LexicalAnalyzer.efnEsCaracterNumUnderline((lexema[j])))
                  {
                    tmp += lexema[j]
                  }
                  else 
                  {
                    foll = false;
                  }
                  j++;
                }
                
                resp = eUtils.replaceAll("@"+tmp, this.eTree.eErikson.Memory.fnEriksonGetEntry(tmp).value, resp);
                i = lexema.indexOf("@", j)
						  }
						}
						else
            {
							resp = lexema;
            }

						return resp;
					},
					flowEriksonResponde: function (ejecuta, first)
          {
						this.eTree.fnErikson(eCs.__RESPONDE__);
						var cad = this.fnToken().cadena;
						this.eTree.fnErikson(eCs.__CADENA__);						
						
            if (ejecuta && !first) 
            {
							this.eCodeGen.fnEriksonExecResponder(this.flowEriksonParseString(cad));
            }
					},
					flowEriksonAsignacion: function (ejecuta, first)
          {
            
						var left = this.fnToken().lexema;
						this.eTree.fnErikson(eCs.__IDENTIFICADOR__);
						this.eTree.fnErikson(eCs.__IGUAL__);

						switch (this.fnToken().valor)
            {
              case eCs.__RANDOM__:
              {
                this.flowRandom(left, ejecuta, first);
                this.fnEriksonProgram(ejecuta, first);
              }
              break
              ;
							case eCs.__PREGUNTA__:		
              {						
								this.flowEriksonPregunta(left, ejecuta, first);
								if (first)
                {
									this.fnEriksonProgram(ejecuta, first);
                }
              }
							break
              ;
							case eCs.__CADENA__:
              {
								var cadena = this.fnToken().cadena;								
								this.eTree.fnErikson(eCs.__CADENA__);								
								if (!first)
                {
									this.eTree.eErikson.Memory.fnEriksonAddEntry(left, this.flowEriksonParseString(cadena));
                }
								this.fnEriksonProgram(ejecuta, first);
              }
							break
              ;
							case eCs.__NUMERO__:
							case eCs.__PARIZ__:
							case eCs.__IDENTIFICADOR__:
              {
								var res = this.fnExpresionOperacion();	
								if (!first)
                {
									this.eTree.eErikson.Memory.fnEriksonAddEntry(left, res);
                }
								this.fnEriksonProgram(ejecuta, first);
              }
              break
              ;
						}
					},		
					fnExpresionOperacion: function()
          {
						var valor = this.fnTerminoOperacion();						
						while (
              this.fnToken().valor == eCs.__POR__ || 
              this.fnToken().valor == eCs.__DIV__ ||
              this.fnToken().valor == eCs.__RES__
            )
            {
							switch (this.fnToken().valor)
              {
								case eCs.__POR__:
									this.eTree.fnErikson(eCs.__POR__);
									valor*=this.fnTerminoOperacion();
									break
                  ;
								case eCs.__DIV__:
									this.eTree.fnErikson(eCs.__DIV__);
									valor/=this.fnTerminoOperacion();
									break
                  ;
								case eCs.__RES__:
									this.eTree.fnErikson(eCs.__RES__);
									valor%=this.fnTerminoOperacion();
									break
                  ;
							}
						}
						return valor;
					},		
					fnTerminoOperacion: function()
          {						
						var valor = this.fnFactorOperacion();						
						while (
              this.fnToken().valor == eCs.__MAS__ || 
							this.fnToken().valor == eCs.__MEN__
            )
            {
							switch (this.fnToken().valor)
              {
								case eCs.__MAS__:
									this.eTree.fnErikson(eCs.__MAS__);
									valor += this.fnFactorOperacion();
									break
                  ;
								case eCs.__MEN__:
									this.eTree.fnErikson(eCs.__MEN__);
									valor -= this.fnFactorOperacion();
									break
                  ;
							}
						}
						return valor;
					},
					fnFactorOperacion: function()
          {
						var valor;
						var token = this.fnToken().valor;
						switch (token)
            {
							case eCs.__NUMERO__:		
								valor=parseInt(this.fnToken().numero);						
								this.eTree.fnErikson(eCs.__NUMERO__);
								break
                ;
							case eCs.__IDENTIFICADOR__:
                entry = this.eTree.eErikson.Memory.fnEriksonGetEntry(this.fnToken().lexema)
								valor = (entry) ? entry.value : 0;
								this.eTree.fnErikson(eCs.__IDENTIFICADOR__);
								break
                ;
							case eCs.__PARIZ__:
								this.eTree.fnErikson(eCs.__PARIZ__);
								valor=this.fnExpresionOperacion();
								this.eTree.fnErikson(eCs.__PARDE__);
								break
                ;
						}
						return valor;
					},
					flowEriksonPregunta: function(left, ejecuta, first)
          {
						this.eTree.fnErikson(eCs.__PREGUNTA__);
						var cad = this.fnToken().cadena;						
						this.eTree.fnErikson(eCs.__CADENA__);
						if (ejecuta && !first) 
            {
							this.eCodeGen.fnEriksonExecPreguntar(left, this.flowEriksonParseString(cad), ejecuta);
            }
					},
          flowRandom: function(left, ejecuta, first)
          {
            this.eTree.fnErikson(eCs.__RANDOM__);
            this.eTree.fnErikson(eCs.__PARIZ__);
            var min = this.fnToken().numero;
            this.eTree.fnErikson(eCs.__NUMERO__);
            this.eTree.fnErikson(eCs.__HASTA__);
            var max = this.fnToken().numero;
            this.eTree.fnErikson(eCs.__NUMERO__);
            this.eTree.fnErikson(eCs.__PARDE__);
            
            if (ejecuta && !first)
            {
              const res = Math.floor(Math.random() * (max - min + 1)) + min;
              this.eTree.eErikson.Memory.fnEriksonAddEntry(left, res);
            }
          },
					fnTree: function()
          {
						// analisis sintactico
						return this.eTree;
					},
					fnToken: function()
          {
						// obtiene el valor del token actual en Tree
						return this.eTree.eToken;
					}
				},
				/* Analisis Predictivo */
				fnErikson: function(expToken, expToken2)
        {
					if (this.eToken.valor == expToken || this.eToken.valor == expToken2)
          {
						this.eToken = this.eErikson.Interpreter.LexicalAnalyzer.fnEriksonAnalex();
          }
          else
          {		 
						this.eErikson.eErrorLog += eTp.error
              .replace("@line", this.eErikson.eLine)
              .replace("@line", this.eErikson.eLine)
              .replace("@text", "ei: " + this.eToken.valor + " - Esperado : " + expToken);
						this.eErikson.Interpreter.eSuccess = false;
					}
				}
			},
			/* Ejecutador de Codigo */
			CodeGenerator: 
      {
				eErikson: undefined,
				eConsole: undefined,
				fnEriksonInitCodeGenerator: function(erikson)
        {
					log("Generador de código iniciado");
					this.eErikson = erikson;
					this.eConsole = $("#console");
					this.eConsole.html("");					
				},
				fnEriksonExecMostrar: function(cadena)
        {
					this.eConsole.append(eTp.mostrar.replace("@text", cadena));
					this.fnRefreshUI();
				},
				fnEriksonExecAlertar: function(cadena)
        {					
					this.eConsole.append(eTp.alertar.replace("@text", cadena));
					this.fnRefreshUI();
				},
				fnEriksonExecResponder: function(cadena)
        {
					this.eConsole.append(eTp.responder.replace("@text", cadena));
					this.fnRefreshUI();
				},
				fnEriksonExecPreguntar: function(entrada, cadena, ejecuta)
        {
          const inputId = "input_" + entrada;
          const btnId = "btn_" + entrada;

					this.eConsole.append(
            eTp.preguntar.replace("@text", cadena)
            .replace("@inputId", inputId)
            .replace("@btnId", btnId)
          );

          isAsking = true;
					this.fnRefreshUI();
					this.eErikson.eFollow = false;
					var eriksonInstance = this.eErikson;	
          				
					$(".entrada").keypress(function(e)
          {
						if (e.charCode == 13)
            {	
              const inputValue = $(this).val();
              if (inputValue === "") 
              {
                $("#" + inputId).focus();
                return;
              }
              isAsking = false;
							e.preventDefault();							
							eriksonInstance.Memory.fnEriksonAddEntry(entrada, inputValue);	
							eriksonInstance.Interpreter.SintacticAnalyzer.Syntax.fnEriksonProgram(ejecuta);
						}
					});			

          $("#" + btnId).click(function () 
          {
            const inputValue = $("#" + inputId).val();
            if (inputValue === "") 
            {
              $("#" + inputId).focus();
              return;
            }
            isAsking = false;
            eriksonInstance.Memory.fnEriksonAddEntry(entrada, inputValue);	
						eriksonInstance.Interpreter.SintacticAnalyzer.Syntax.fnEriksonProgram(ejecuta);
          });
          
          setTimeout(() => 
          {
            $("#" + inputId).focus();
          }, 500);
				},
				fnRefreshUI: function()
        {
					$(".elements").slideDown(200);

          setTimeout(() => 
          {
            $(".elements2").slideDown(200);
          }, 300);
				}
			},
			/* Inicia el proceso de Interpretación */
			fnEriksonStart: function()
      {
				this.CodeGenerator.fnEriksonInitCodeGenerator(this.eErikson);
				var Success = this.SintacticAnalyzer.fnEriksonAnalsin();				

				return Success;				
			},
			fnEriksonInitInterpreter: function(erikson, withlimits)
      {
				this.eErikson = erikson;				
				this.LexicalAnalyzer.fnEriksonInitLexicalAnalizer(erikson);
				this.SintacticAnalyzer.fnEriksonInitSintacticAnalyzer(erikson);
				this.eRequireLimits = withlimits;
			},
		},	
		fnGUIResAnimate: function(cad)
    {
			this.eResults.fadeIn(100);

			$("#Res", this.eResults).html(cad);
			var res = this.eResults;
			setInterval(function()
      {
        res.slideUp(2000);
      }, 2000);
		},
		fnInitErikson: function(string, limits)
    {			
			this.eResults = $("#Resultado");
			this.eErrorer = $("#Errorer");
			this.eErrContent = $("#Errors");
			this.eIndex = 0x0000;
			this.eLine = 0x0000;
			this.eString = string;
			this.eRequireLimits = limits;
			this.eLength = this.eString.length;
			this.Memory.fnEriksonDeallocateMemory();
			this.SymTab.fnEriksonLoadTable();				
			this.Interpreter.fnEriksonInitInterpreter(this, limits);
			var Success = this.Interpreter.fnEriksonStart();
			this.eErrContent.slideUp(300);	
			
			if (Success)
      {
				this.fnGUIResAnimate("<div class='success-execution'>Ejecucion Exitosa!</div>");
				this.eIndex = 0x0000;
				this.eLine = 0x0000;
				this.ePasada = 0x0002;
				this.Memory.fnEriksonDeallocateMemory();
				this.SymTab.fnEriksonLoadTable();				
				this.Interpreter.fnEriksonInitInterpreter(this, limits);
				Success = this.Interpreter.fnEriksonStart();
				if (Success) 
        {
          this.fnGUIResAnimate("<div class='success-execution'>Ejecucion Exitosa2!</div>");
        }
			}
			else
      {
				this.eErrContent.slideDown(300);
				this.fnGUIResAnimate("<div class='failed-execution'>Algo falló!</div>")				
				this.eErrorer.html('');
				this.eErrorer.html(this.eErrorLog);
			}
		},
	};
}

/* global functions  */
String.prototype.trim = function() 
{
    return this.replace(/^\s+|\s+$/g, "");
};