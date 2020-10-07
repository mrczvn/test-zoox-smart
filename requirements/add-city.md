# Inserir Cidade

> ## Caso de sucesso

1. ✅ Recebe uma requisição do tipo **POST** na rota **/api/city/:{state_id}**
2. ✅ Valida o parâmetro **{state_id}**
3. ✅ Valida dados obrigatórios **nome**
4. ✅ Valida se o campo **nome** é válido
5. ✅ **Cria** uma Cidade com os dados fornecidos, **adicionando** os campos **data de criação**
   e **data da última alteração**
6. ✅ Retorna **201**, sem dados

> ## Exceções

1. ✅ Retorna erro **403** se o **{state_id}** passado na URL for inválido
2. ✅ Retorna erro **400** se o **nome** não for fornecido
3. ✅ Retorna erro **400** se o campo **nome** for inválido
4. ✅ Retorna erro **403** se a Cidade fornecida já estiver criada
5. ✅ Retorna erro **500** se der erro ao tentar criar a Cidade
