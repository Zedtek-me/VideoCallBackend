import asgiref.sync as sync_toggle #to toggle between sync and async interfaces
from channels.generic.websocket import AsyncWebsocketConsumer
import json

class UserSignal(AsyncWebsocketConsumer):
    connecting_users= []#stores all connecting users, to help distinguish where to send webrtc offer afterwards.
    async def connect(self):
        user= self.scope.get(user)#gets current user
        self.accept()
        await self.connecting_users.append(user)#stores user in the list of connecting users
        await self.send(json.dumps({'user':user}))#send user to the frontend for awareness and processing.

    async def group_recv(self, text_data):#meant to broadcast between peers
        self.channel_layer.group_send()
        pass
    
    async def websocket(self, event):#receive events from group broadcast, and send it back to the actual client, in its own tcp scope.
        await self.send(text_data= event)


    async def disconnet(self):
        self.connecting_users.remove(self.scope.get('user'))#remove from my users' array before disconnecting.
        await self.disconnect()