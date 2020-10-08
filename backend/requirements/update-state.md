# Atualizar Estado

> ## Caso de sucesso

1. ✅ Recebe uma requisição do tipo **PUT** na rota **/api/state/:{state_id}**
2. ✅ Valida o parâmetro **{state_id}**
3. ✅ Valida dados obrigatórios **nome** e **abreviação**
4. ✅ Valida se os campos **nome** e **abreviação** são válidos
5. ✅ **Atualiza** um Estado com os dados fornecidos, **atualizando** os campos **data de criação**
   e **data da última alteração**
6. ✅ Retorna **204**, sem dados

> ## Exceções

1. ✅ Retorna erro **403** se o **{state_id}** passado na URL for inválido
2. ✅ Retorna erro **400** se **nome** e **abreviação** não forem fornecidos
3. ✅ Retorna erro **400** se os campos **nome** e **abreviação** forem inválidos
4. ✅ Retorna erro **500** se der erro ao tentar atualizar o Estado
