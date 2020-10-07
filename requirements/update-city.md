# Atualizar Cidade

> ## Caso de sucesso

1. ✅ Recebe uma requisição do tipo **PUT** na rota **/api/city/?state={state_id}&city={city_id}**
2. ✅ Valida os parâmetros **{state_id}** e **{city_id}**
3. ✅ Valida dados obrigatórios **nome**
4. ✅ Valida se o campo **nome** é válido
5. ✅ **Atualiza** uma Cidade com os dados fornecidos, **atualizando** os campos **data de criação**
   e **data da última alteração**
6. ✅ Retorna **204**, sem dados

> ## Exceções

1. ✅ Retorna erro **403** se o **{state_id}** ou **{city_id}** passado na URL for inválido
2. ✅ Retorna erro **400** se o campo **nome** não for fornecido
3. ✅ Retorna erro **400** se o campo **nome** for inválido
4. ✅ Retorna erro **500** se der erro ao tentar atualizar a Cidade
