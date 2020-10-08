# Deletar Cidade

> ## Caso de sucesso

1. ✅ Recebe uma requisição do tipo **DELETE** na rota **/api/city/:{city_id}**
2. ✅ Valida o parâmetro **city_id**
3. ✅ **Deleta** a Cidade informada.
4. ✅ Retorna **204**, sem dados

> ## Exceções

1. ✅ Retorna erro **403** se o **{city_id}** passado na URL for inválido
2. ✅ Retorna erro **500** se der erro ao tentar deletar a Cidade
