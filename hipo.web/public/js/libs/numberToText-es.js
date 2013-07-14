//LA FUNCION BASE ES LA QUE DEVUELVE LA ÚLTIMA PARTE SEGÚN EL NUMERO
//EXTRAIDO DE http://www.compunauta.com/forums/linux/programacion/java/gus_int2word.html
function base(num) {
    end = num - Math.floor(num / 10) * 10;
    switch (end) {
    case 1:
        return "uno";
        break;
    case 2:
        return "dos";
        break;
    case 3:
        return "tres";
        break;
    case 4:
        return "cuatro";
        break;
    case 5:
        return "cinco";
        break;
    case 6:
        return "seis";
        break;
    case 7:
        return "siete";
        break;
    case 8:
        return "ocho";
        break;
    case 9:
        return "nueve";
        break;
    case 0:
        if (num == 0) {
            return "cero";
        } else {
            return "";
        }
        break;
    }
    return end;
}
//LA FUNCION DECIMOS ES PARA 99 -> 0 Y LLAMA A LA BASE

function decimos(num) {
    if (num < 10) {
        return base(num);
    }
    ends = num - Math.floor(num / 100) * 100;
    end = ends - (num - Math.floor(num / 10) * 10);
    endd = Math.floor(ends);
    switch (end) {
    case 10:
        if (ends < 16) {
            switch (endd) {
            case 10:
                return "diez";
                break;
            case 11:
                return "once";
                break;
            case 12:
                return "doce";
                break;
            case 13:
                return "trece";
                break;
            case 14:
                return "catorce";
                break;
            case 15:
                return "quince";
            }
        } else {
            return "diez y " + base(num);
        }
        break;
    case 20:
        if (ends == 20) {
            return "veinte";
        } else {
            return "veinti" + base(num);
        }
        break;
    case 30:
        if (ends == 30) {
            return "treinta";
        } else {
            return "treinta y " + base(num);
        }
        break;
    case 40:
        if (ends == 40) {
            return "cuarenta";
        } else {
            return "cuarenta y " + base(num);
        }
        break;
    case 50:
        if (ends == 50) {
            return "cincuenta";
        } else {
            return "cincuenta y " + base(num);
        }
        break;
    case 60:
        if (ends == 60) {
            return "sesenta";
        } else {
            return "sesenta y " + base(num);
        }
        break;
    case 70:
        if (ends == 70) {
            return "setenta";
        } else {
            return "setenta y " + base(num);
        }
        break;
    case 80:
        if (ends == 80) {
            return "ochenta";
        } else {
            return "ochenta y " + base(num);
        }
        break;
    case 90:
        if (ends == 90) {
            return "noventa";
        } else {
            return "noventa y " + base(num);
        }
        break;
    case 0:
        return base(num);
    }
}
//LA FUNCION CIENTOS ES PARA 99 -> 0 Y LLAMA A DECIMOS

function cientos(num) {
    if (num < 100) {
        return decimos(num);
    }
    var ends = num - Math.floor(num / 1000) * 1000;
    var end = ends - (num - Math.floor(num / 100) * 100);
    switch (end) {
    case 100:
        if (ends == 100) {
            return "cien";
        } else {
            return "ciento " + decimos(num);
        }
        break;
    case 900:
        return "novecientos " + decimos(num);
        break;
    case 700:
        return "setecientos " + decimos(num);
        break;
    case 0:
        return decimos(num);
        break;
    default:
        return base(end / 100) + "cientos " + decimos(num);
        break;
    }
}
//CIENTOSX es para los miles que terminane en 1

function cientos_x(num) {
    endd = num - Math.floor(num / 10) * 10;
    ends = endd - Math.floor(endd / 10) * 10;
    resultado = cientos(num);
    if (ends == 1 && endd != 11) {
        return resultado.substring(0, resultado.length - 1);
    } else {
        return resultado;
    }
}

function miles(num) {
    if (num < 1000) {
        return cientos(num);
    }
    ends = num - Math.floor(num / 10000) * 10000;
    end = ends - (num - Math.floor(num / 1000) * 1000);
    switch (end) {
    case 1000:
        if (ends == 1000) {
            return "mil";
        } else {
            return "mil " + cientos(num);
        }
        break;
    default:
        mil = base(Math.floor(num / 1000));
        if (mil == 0) {
            return cientos(num);
        } else {
            return mil + " mil " + cientos(num);
        }
        break;
    }
}

function cientos_de_miles(num) {
    if (num < 10000) {
        return miles(num);
    }
    var ends = Math.floor((num - Math.floor(num / 1000000) * 1000000) / 1000);
    return cientos_x(ends) + " mil " + cientos(num);
}

function millones(num) {
    if (num < Math.pow(10, 6)) {
        return cientos_de_miles(num);
    }
    var ends = Math.floor(num / Math.pow(10, 6));
    var end = ends - Math.floor(ends / 10) * 10;
    resultado = cientos_de_miles(ends);
    if (end == 1) {
        parcial = resultado.substring(0, resultado.length - 1);
        if (ends < 2) {
            return parcial + " millón " + cientos_de_miles(num);
        } else {
            return parcial + " millones " + cientos_de_miles(num);
        }
    }
    return resultado + " millones " + cientos_de_miles(num);
}