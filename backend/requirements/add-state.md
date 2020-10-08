# Inserir Estado

> ## Caso de sucesso

1. ✅ Recebe uma requisição do tipo **POST** na rota **/api/state**
2. ✅ Valida dados obrigatórios **nome** e **abreviação**
3. ✅ Valida se os campos **nome** e **abreviação** são válidos
4. ✅ **Cria** um Estado com os dados fornecidos, **adicionando** os campos **data de criação**
   e **data da última alteração**
5. ✅ Retorna **201**, sem dados

> ## Exceções

1. ✅ Retorna erro **400** se **nome** e **abreviação** não forem fornecidos
2. ✅ Retorna erro **400** se os campos **nome** e **abreviação** forem inválidos
3. ✅ Retorna erro **403** se o Estado fornecido já estiver criado
4. ✅ Retorna erro **500** se der erro ao tentar criar o Estado
