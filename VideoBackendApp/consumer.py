from channels.generic.websocket import AsyncWebsocketConsumer
import json

class UserSignal(AsyncWebsocketConsumer):
    connecting_users= []#stores all connecting users, to help distinguish where to send webrtc offer afterwards.
    async def connect(self):
        user= self.scope.get('user')#gets current user
        await self.accept()
        self.connecting_users.append(user)#stores user in the list of connecting users
        await self.send(json.dumps({'user':user.username, 'host_status': user.is_host}))#send name of the user to the frontend for awareness and processing.
        # await self.channel_layer.group_add('Peers', self.channel_name)

    async def group_recv(self, text_data):#meant to broadcast among peers
        await self.channel_layer.group_send('Peers', {
            'type' :'user.rcv',
            'message':'Hey, you\'re connected.',
            'user' : await self.scope.get('user')
        })
    
    async def user_rcv(self, event):#receive events from group broadcast, and send it back to the actual client, in its own tcp scope.
        print(event, json.loads(event))
        await self.send(text_data= json.loads(event.get('message')))#sends the message sent to the group, to a user


    async def disconnet(self):
        self.connecting_users.remove(self.scope.get('user'))#remove from my users' array before disconnecting.
        await self.disconnect()