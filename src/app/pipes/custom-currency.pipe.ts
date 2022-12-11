import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'customCurrency'})
export class CustomCurrencyPipe implements PipeTransform {
  transform(value: number, currency = ""): string {
    let mapCurrency = new Map<string, string>();
    mapCurrency.set("EUR", "€");
    mapCurrency.set("USD", "$");
    let symbol = mapCurrency.get(currency);
    if(currency==="" || symbol===undefined) return value.toString();
    return value + symbol;
  }
}