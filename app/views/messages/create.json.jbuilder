  json.(@message, :content, :image)
  json.date @message.created_at.strftime("%Y/%m/%d %H:%M")
  json.user_name @message.user.name
  json.id @message.id