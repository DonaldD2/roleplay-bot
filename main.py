
from discord.ext.commands.core import dm_only
from keep_alive import keep_alive
import discord
import random
from discord.ext import commands
import time
from discord.utils import get
from discord.ext.commands import Bot
import asyncio
import typing
from discord.ext.commands import has_permissions, CheckFailure
from discord.utils import get
import logging
import inspect
from PIL import Image
import json
import sys
import string
from translate import Translator
import requests
from discord import Webhook, RequestsWebhookAdapter, File
import urllib.request
from datetime import datetime
import ast
import aiohttp
import os
import platform
from discord_slash import SlashCommand, SlashContext
from discord_slash.utils.manage_commands import create_choice, create_option
from discord_slash.utils.manage_commands import create_permission
from discord_slash.model import SlashCommandPermissionType
from discord import Activity, ActivityType


#-----CONFIGURATION-----

prefix = "?" # What symbol(s) will trigger a command
token = "" # Bot login authentication
test_guilds = [769260943602483230]

#-----CONFIG ENDS HERE!-----

login = time.time()
intents = discord.Intents.default()
intents.members = True
client = commands.Bot(command_prefix = prefix, intents=intents, case_insensitive=True)
slash = SlashCommand(client, sync_commands=True)
client.remove_command("help")

@client.event
async def on_ready():
    await client.change_presence(activity=Activity(name=f"Role Playing With {len(client.users)} Members", 
                                                    type=ActivityType.watching))
    print(f"Connected and Online.")
    print(f"Discord.py API version: {discord.__version__}")
    print(f"Python Version: {platform.python_version()}")
    print(f"Running on: {platform.system()} {platform.release()} ({os.name})")
    print("-------------------")

@client.event
async def on_member_join(member):
    if member.guild.id == 873041677361770536:
        role = discord.utils.get(member.guild.roles, id=873214733740814406)
        await member.add_roles(role)
        channel = client.get_channel(873377288643833867)
        await channel.send(f"Welcome <@{member.id}> to the Roleplay Bot Support server! Feel free to look around and have a chat. if you have a bug to report, use <#873216377341755432>. If you have a suggestion, use <#873216353937539072>. if you need help with the bot, use <#873216334396260402>. Hope you enjoy using the bot!")
        



@slash.slash(name="help", description="Sends you a list of my commands")
async def help(ctx):
  with open("commands.json","r") as f:
    commands = json.load(f)
  embed=discord.Embed(description="__**Roleplay Bot Commands**__\nCommands marked with `*` require you to `@mention` the user!**.", color=0x004cff)
  for key,value in commands.items():
    embed.add_field(name=f"{prefix}{key}", value=value, inline=False)
    embed.set_thumbnail(url="https://c.file.glass/ihdhj")
  await ctx.author.send(embed=embed)
  await ctx.send(embed=discord.Embed(description="**I have messaged you a list of my commands!**", color=0x004cff))

@slash.slash(name="twt", description="Sends a twitter like message.")
async def twotter(ctx,*,content):
    embed=discord.Embed(title="<:twitter:858110570087972884> TWOTTER",description=f"{content}", color=0x1DA1F2)
    embed.set_author(name=f"@{ctx.author.display_name}", icon_url=ctx.author.avatar_url)
    embed.set_footer(text="Twotter for iFruit", icon_url="https://cdn.discordapp.com/emojis/858110570087972884.png?v=1")
    await ctx.channel.send(embed=embed)
    await ctx.send("Sent!", hidden=True)


@slash.slash(name="tor", description="Sends a tor message")
async def tor(ctx,*,content):
      embed=discord.Embed(title="<:tor:869045322704371806> Tor Project",description=f"{content}", color=0x7D4698)
      embed.set_author(name="Unknown User", icon_url="https://archive.flossmanuals.net/tech-tools-for-activism/_booki/tech-tools-for-activism/static/anon_logo.png")
      await ctx.channel.send(embed=embed)
      await ctx.send("Sent!", hidden=True)
      print(ctx.author.display_name + f' sent {content}')

@slash.slash(name="life", description="Sends a life invader message")
async def life(ctx,*,content):
      embed=discord.Embed(title="<:life:868996525127258154> LifeInvader",description=f"{content}", color=0xff0000)
      embed.set_author(name=f"@{ctx.author.display_name}", icon_url=ctx.author.avatar_url)
      await ctx.channel.send(embed=embed)
      await ctx.send("Sent!", hidden=True)

@slash.slash(name="txt", description="Sends a text message to a user")
async def text(ctx,*,user:discord.Member, content):
  if ctx.author == user:
    await ctx.send("You can't text yourself!", hidden=True)
  else:
    embed=discord.Embed(title="<a:phone:858107193656213534> iFruit Message",description=f"{user.mention} {content}", color=0x00d622)
    embed.set_author(name=f"@{ctx.author.display_name}", icon_url=ctx.author.avatar_url)
    await ctx.channel.send(embed=embed)
    await ctx.send("Delievered!", hidden=True)

@slash.slash(name="call", description="Starts a call with a user")
async def contact(ctx, user:discord.Member):
  if ctx.author == user:
    await ctx.send(embed=discord.Embed(description=f"You can't call yourself!", color=0x004cff, hidden=True))
  if ctx.author != user:
    msg = await ctx.send(f"**<a:telephone:858107193656213534> Calling {user.display_name}...**")
    try:
      acceptCheck = await user.send(f"**<a:phone:858107193656213534> {ctx.author.display_name} is calling you. React with <:accept:858107173799198740> to accept or <:decline:858107161266618369> to decline.**")
      await acceptCheck.add_reaction("<:accept:858107173799198740>")
      await acceptCheck.add_reaction("<:decline:858107161266618369>")

      def acceptCheck(reaction, user2):
        return user2 == user

      acceptDecline, user = await client.wait_for("reaction_add", check=acceptCheck)

      def ctxCheck(message):
        return message.author == ctx.author and message.guild == None

      def uCheck(message):
        return message.author == user and message.guild == None

      if str(acceptDecline) == "<:decline:858107161266618369>": # declined
        await ctx.author.send(f"**`{user.display_name}` declined your call.**")
        await user.send(f"**You declined.**")
        await msg.edit(content=f"**<:decline:858107161266618369> {user.display_name} declined.**")
      elif str(acceptDecline) == "<:accept:858107173799198740>": # accepted
        await msg.edit(content=f"**<:accept:858107173799198740> `{user.display_name}` accepted.**")
        await ctx.author.send(f"**You are now on call with {user.display_name}! Say something or `end` at any time to hang up!**")
        await user.send(f"**You are now on call with {ctx.author.display_name}! Say `end` at any time to hang up!**")
        endCall = False
        while endCall == False:
          ctxMsg = await client.wait_for("message",check=ctxCheck)
          if ctxMsg.content.lower() == "end":
            endCall = True
            await user.send(f"**{ctx.author.display_name} ended the call.**")
            await ctx.author.send(f"**You ended the call.**")
          else:
            await user.send(f"**{ctx.author.display_name}:** {ctxMsg.content}")

          uMsg = await client.wait_for("message",check=uCheck)
          if uMsg.content.lower() == "end":
            endCall = True
            await ctx.author.send(f"**{user.display_name} ended the call.**")
            await user.send(f"**You ended the call.**")
          else:
            await ctx.author.send(f"**{user.display_name}:** {uMsg.content}")
    except:
      await msg.edit(content=f"**❌ {user.display_name} was not reachable.**")

@slash.slash(name="cuff", description="Applies handcuffs to a user")
async def cuff(ctx, user:discord.Member):
    msg = await ctx.send(embed=discord.Embed(description=f"Applying cuffs...", color=0x004cff))
    await asyncio.sleep(1)
    await msg.edit(embed=discord.Embed(description=f"**{ctx.author.display_name}** cuffed **{user.display_name}**!", color=0x004cff))
  
@slash.slash(name="uncuff", description="Removes handcuffs from a user")
async def uncuff(ctx, user:discord.Member):
    msg = await ctx.send(embed=discord.Embed(description=f"Unapplying cuffs...", color=0x004cff))
    await asyncio.sleep(1)
    await msg.edit(embed=discord.Embed(description=f"**{ctx.author.display_name}** uncuffed **{user.display_name}**!", color=0x004cff))

@slash.slash(name="read-id", description="Reads a civilian's ID")
async def readid(ctx, user:discord.Member):
    await ctx.send(user.mention,embed=discord.Embed(description=f"**{user.display_name}'s ID is being read by {ctx.author.display_name}!**\n*please state your name below*", color=0x004cff))

@slash.slash(name="grab", description="Grabs a user by force")
async def grab(ctx, user:discord.Member):
    await ctx.send(embed=discord.Embed(description=f"**{ctx.author.display_name}** has grabbed **{user.display_name}**!", color=0x004cff))

@slash.slash(name="ping", description="Share your location with another user")
async def ping(ctx, user:discord.Member):
    await ctx.send(embed=discord.Embed(description=f"**{ctx.author.display_name}**'s location has been pinged to **{user.display_name}**!\n`You are now able to locate {ctx.author.display_name} using your pause screen!`", color=0x004cff))

@slash.slash(name="searches", description="Search a user")
async def search(ctx, user:discord.Member):
    await ctx.send(embed=discord.Embed(description=f"**{ctx.author.display_name}** is searching **{user.display_name}**!\n`Please state everything currently on you.`", color=0x004cff))

@slash.slash(name="tackles", description="Tackles a member to the ground")
async def tackle(ctx, user:discord.Member):
    msg = await ctx.send(embed=discord.Embed(description=f"**Tackling...**", color=0x004cff))
    await asyncio.sleep(0.5)
    await msg.edit(embed=discord.Embed(description=f"**{ctx.author.display_name}** has tackled s*{user.display_name}**!", color=0x004cff))

@slash.slash(name="vitals", description="Check someones vitals")
async def check(ctx, user:discord.Member):
    await ctx.send(embed=discord.Embed(description=f"**{ctx.author.display_name}** is checking **{user.display_name}**'s injuries and pulse!\n`State your injuries and pulse below!`", color=0x004cff))

@slash.slash(name="lock", description="Locks your vehicle")
async def lock(ctx):
    await ctx.send(embed=discord.Embed(description=f"**{ctx.author.display_name}** has locked their vehicle!", color=0x004cff))

@slash.slash(name="unlocks", description="Unlocks your vehicle")
async def unlock(ctx):
    await ctx.send(embed=discord.Embed(description=f"**{ctx.author.display_name}** has unlocked their vehicle!", color=0x004cff))

@slash.slash(name="pindown", description="Pins a user down to the ground")
async def pindown(ctx, user:discord.Member):
    await ctx.send(embed=discord.Embed(description=f"**{ctx.author.display_name}** has pinned **{user.display_name}** down!", color=0x004cff))

@slash.slash(name="rackweapon", description="tores your weapon")
async def rackweapon(ctx):
    await ctx.send(embed=discord.Embed(description=f"**{ctx.author.display_name}** has racked their weapon.", color=0x004cff))

@slash.slash(name="reload", description="Reloads your weapon")
async def reload(ctx):
    msg = await ctx.send(embed=discord.Embed(description=f"*Reloading...*", color=0x004cff))
    await asyncio.sleep(3)
    await msg.edit(embed=discord.Embed(description=f"**{ctx.author.display_name}** has reloaded their weapon.", color=0x004cff))

@slash.slash(name="refuel", description="Refuel a vehicle")
async def refuel(ctx):
    msg = await ctx.send(embed=discord.Embed(description=f"*Refueling...*", color=0x004cff))
    await asyncio.sleep(5)
    await msg.edit(embed=discord.Embed(description=f"**{ctx.author.display_name}** has refueled.", color=0x004cff))

@slash.slash(name="eng-on", description="Turn on your vehicle engine")
async def engon(ctx):
    msg = await ctx.send(embed=discord.Embed(description=f"**{ctx.author.display_name}** is turning their engine on...", color=0x004cff))
    await asyncio.sleep(1)
    await msg.edit(embed=discord.Embed(description=f"**{ctx.author.display_name}** has turned on their engine.", color=0x004cff))

@slash.slash(name="eng-off", description="Turn off your vehicle engine")
async def engoff(ctx):
    msg = await ctx.send(embed=discord.Embed(description=f"**{ctx.author.display_name}** is turning their engine off...", color=0x004cff))
    await asyncio.sleep(1)
    await msg.edit(embed=discord.Embed(description=f"**{ctx.author.display_name}** has turned off their engine.", color=0x004cff))

#####################################################################



#added
@client.command(aliases=["commands","cmds", "command", "cmd"])
async def help(ctx):
  with open("commands.json","r") as f:
    commands = json.load(f)

  embed=discord.Embed(description="__**ExiaRP Commands**__\nCommands marked with `*` require you to `@mention` the user!\nBot made by **ExiaRP Development Team**.", color=0x004cff, timestamp=ctx.message.created_at)
  for key,value in commands.items():
    embed.add_field(name=f"{prefix}{key}", value=value, inline=False)
    embed.set_thumbnail(url="https://cdn.discordapp.com/icons/527703359893930019/974dccedb450e41ef6efde6a974353e6.webp")
  await ctx.author.send(embed=embed)
  if ctx.message.guild != None:
    await ctx.send(embed=discord.Embed(description="**I have messaged you a list of my commands!**", color=0x004cff))

#added
@client.command(aliases=["c","cuffs"])
async def cuff(ctx, user:discord.Member):
  if ctx.message.guild != None:
    msg = await ctx.send(embed=discord.Embed(description=f"Applying cuffs...", color=0x004cff, timestamp=ctx.message.created_at))

    await asyncio.sleep(1)

    await msg.edit(embed=discord.Embed(description=f"**{ctx.author.display_name}** cuffed **{user.display_name}**!", color=0x004cff, timestamp=ctx.message.created_at))

#added
@client.command(aliases=["uc","uncuffs"])
async def uncuff(ctx, user:discord.Member):
  if ctx.message.guild != None:
    msg = await ctx.send(embed=discord.Embed(description=f"Unapplying cuffs...", color=0x004cff, timestamp=ctx.message.created_at))

    await asyncio.sleep(1)

    await msg.edit(embed=discord.Embed(description=f"**{ctx.author.display_name}** uncuffed **{user.display_name}**!", color=0x004cff, timestamp=ctx.message.created_at))

#added
@client.command(aliases=["read-id","reads-id","read","id"])
async def readid(ctx, user:discord.Member):
  if ctx.message.guild != None:
    await ctx.send(user.mention,embed=discord.Embed(description=f"**{user.display_name}'s ID is being read by {ctx.author.display_name}!**\n*please state your name below*", color=0x004cff,timestamp=ctx.message.created_at))

#added
@client.command(aliases=["g","grabs"])
async def grab(ctx, user:discord.Member):
  if ctx.message.guild != None:
    await ctx.send(embed=discord.Embed(description=f"**{ctx.author.display_name}** has grabbed **{user.display_name}**!", color=0x004cff,timestamp=ctx.message.created_at))

#added
@client.command(aliases=["pings"])
async def ping(ctx, user:discord.Member):
  if ctx.message.guild != None:
    await ctx.send(embed=discord.Embed(description=f"**{ctx.author.display_name}**'s location has been pinged to **{user.display_name}**!\n`You are now able to locate {ctx.author.display_name} using your pause screen!`", color=0x004cff,timestamp=ctx.message.created_at))

#added
@client.command(aliases=["searches"])
async def search(ctx, user:discord.Member):
  if ctx.message.guild != None:
    await ctx.send(embed=discord.Embed(description=f"**{ctx.author.display_name}** is searching **{user.display_name}**!\n`Please state everything currently on you.`", color=0x004cff,timestamp=ctx.message.created_at))

#added
@client.command(aliases=["tackles"])
async def tackle(ctx, user:discord.Member):
  if ctx.message.guild != None:
    msg = await ctx.send(embed=discord.Embed(description=f"**Tackling...**", color=0x004cff,timestamp=ctx.message.created_at))

    await asyncio.sleep(0.5)

    await msg.edit(embed=discord.Embed(description=f"**{ctx.author.display_name}** has tackled **{user.display_name}**!", color=0x004cff,timestamp=ctx.message.created_at))

#added
@client.command(aliases=["vitals"])
async def check(ctx, user:discord.Member):
  if ctx.message.guild != None:
    await ctx.send(embed=discord.Embed(description=f"**{ctx.author.display_name}** is checking **{user.display_name}**'s injuries and pulse!\n`State your injuries and pulse below!`", color=0x004cff,timestamp=ctx.message.created_at))

#added
@client.command(aliases=["l","locks"])
async def lock(ctx):
  if ctx.message.guild != None:
    await ctx.send(embed=discord.Embed(description=f"**{ctx.author.display_name}** has locked their vehicle!", color=0x004cff,timestamp=ctx.message.created_at))

#added
@client.command(aliases=["ul","unlocks"])
async def unlock(ctx):
  if ctx.message.guild != None:
    await ctx.send(embed=discord.Embed(description=f"**{ctx.author.display_name}** has unlocked their vehicle!", color=0x004cff,timestamp=ctx.message.created_at))

#added
@client.command(aliases=["pd","pin-down","pins-down","pinsdown"])
async def pindown(ctx, user:discord.Member):
  if ctx.message.guild != None:
    await ctx.send(embed=discord.Embed(description=f"**{ctx.author.display_name}** has pinned **{user.display_name}** down!", color=0x004cff,timestamp=ctx.message.created_at))

#added
@client.command(aliases=["rw","rack-weapon","racks-weapon","racksweapon"])
async def rackweapon(ctx):
  if ctx.message.guild != None:
    await ctx.send(embed=discord.Embed(description=f"**{ctx.author.display_name}** has racked their weapon.", color=0x004cff,timestamp=ctx.message.created_at))

#added
@client.command(aliases=[])
async def reload(ctx):
  if ctx.message.guild != None:
    msg = await ctx.send(embed=discord.Embed(description=f"*Reloading...*", color=0x004cff,timestamp=ctx.message.created_at))

    await asyncio.sleep(3)

    await msg.edit(embed=discord.Embed(description=f"**{ctx.author.display_name}** has reloaded their weapon.", color=0x004cff,timestamp=ctx.message.created_at))

#added
@client.command(aliases=["refuels"])
async def refuel(ctx):
  if ctx.message.guild != None:
    msg = await ctx.send(embed=discord.Embed(description=f"*Refueling...*", color=0x004cff,timestamp=ctx.message.created_at))

    await asyncio.sleep(5)

    await msg.edit(embed=discord.Embed(description=f"**{ctx.author.display_name}** has refueled.", color=0x004cff,timestamp=ctx.message.created_at))

#added
@client.command(aliases=["eon","eng-on","engineon","engine-on"])
async def engon(ctx):
  if ctx.message.guild != None:
    msg = await ctx.send(embed=discord.Embed(description=f"**{ctx.author.display_name}** is turning their engine on...", color=0x004cff,timestamp=ctx.message.created_at))

    await asyncio.sleep(1)

    await msg.edit(embed=discord.Embed(description=f"**{ctx.author.display_name}** has turned on their engine.", color=0x004cff,timestamp=ctx.message.created_at))

#added
@client.command(aliases=["eoff","eng-off","engineoff","engine-off"])
async def engoff(ctx):
  if ctx.message.guild != None:
    msg = await ctx.send(embed=discord.Embed(description=f"**{ctx.author.display_name}** is turning their engine off...", color=0x004cff,timestamp=ctx.message.created_at))

    await asyncio.sleep(1)

    await msg.edit(embed=discord.Embed(description=f"**{ctx.author.display_name}** has turned off their engine.", color=0x004cff,timestamp=ctx.message.created_at))

#added
@client.command(aliases=["tweet","twt"])
async def twotter(ctx,*,content):
    if ctx.message.guild != None:
      await ctx.message.delete()
    embed=discord.Embed(title="<:twitter:858110570087972884> TWOTTER",description=f"{content}", color=0x1DA1F2,timestamp=ctx.message.created_at)
    if ctx.author.id == 270197742016397314 or ctx.author.id == 707353661088595988 or ctx.author.id == 806875351384719370 or ctx.author.id == 214368408215486464 or ctx.author.id == 550503935715311637 or ctx.author.id == 426658450089574402 or ctx.author.id == 258272353908293652 or ctx.author.id == 318203855365996544 or ctx.author.id == 824104012831391765:
      embed=discord.Embed(title="<:verified:869045206857711657> TWOTTER **Verified**",description=f"{content}", color=0x1DA1F2,timestamp=ctx.message.created_at)
    else:
      embed=discord.Embed(title="<:twitter:858110570087972884> TWOTTER",description=f"{content}", color=0x1DA1F2,timestamp=ctx.message.created_at)
    embed.set_author(name=f"@{ctx.author.display_name}", icon_url=ctx.author.avatar_url)
    await ctx.send(embed=embed)

#added
@client.command()
async def tor(ctx,*,content):
    if ctx.message.guild != None:
      await ctx.message.delete()
      embed=discord.Embed(title="<:tor:869045322704371806> Tor Project",description=f"{content}", color=0x7D4698,timestamp=ctx.message.created_at)
      embed.set_author(name="Unknown User", icon_url="https://archive.flossmanuals.net/tech-tools-for-activism/_booki/tech-tools-for-activism/static/anon_logo.png")
    await ctx.send(embed=embed)

#added
@client.command(aliases=["lifeinvader"])
async def life(ctx,*,content):
    if ctx.message.guild != None:
      await ctx.message.delete()
      embed=discord.Embed(title="<:life:868996525127258154> LifeInvader",description=f"{content}", color=0xff0000,timestamp=ctx.message.created_at)
      embed.set_author(name=f"@{ctx.author.display_name}", icon_url=ctx.author.avatar_url)
    await ctx.send(embed=embed)

#added
@client.command(aliases=["txt","msg","message"])
async def text(ctx,*,content):
  if ctx.message.guild != None:
    await ctx.message.delete()
    embed=discord.Embed(title="<a:phone:858107193656213534> iFruit Message",description=f"{content}", color=0x00d622,timestamp=ctx.message.created_at)
    embed.set_author(name=f"@{ctx.author.display_name}", icon_url=ctx.author.avatar_url)
    await ctx.send(embed=embed)

#added
@client.command(aliases=["call"])
async def contact(ctx, user:discord.Member):
  if ctx.author == user:
    await ctx.send(embed=discord.Embed(description=f"You can't call yourself!", color=0x004cff,timestamp=ctx.message.created_at))
  if ctx.author != user:
    msg = await ctx.send(f"**<a:telephone:858107193656213534> Calling {user.display_name}...**")
    try:
      acceptCheck = await user.send(f"**<a:phone:858107193656213534> {ctx.author.display_name} is calling you. React with <:accept:858107173799198740> to accept or <:decline:858107161266618369> to decline.**")
      await acceptCheck.add_reaction("<:accept:858107173799198740>")
      await acceptCheck.add_reaction("<:decline:858107161266618369>")

      def acceptCheck(reaction, user2):
        return user2 == user

      acceptDecline, user = await client.wait_for("reaction_add", check=acceptCheck)

      def ctxCheck(message):
        return message.author == ctx.author and message.guild == None

      def uCheck(message):
        return message.author == user and message.guild == None

      if str(acceptDecline) == "<:decline:858107161266618369>": # declined
        await ctx.author.send(f"**`{user.display_name}` declined your call.**")
        await user.send(f"**You declined.**")
        await msg.edit(content=f"**<:decline:858107161266618369> {user.display_name} declined.**")
      elif str(acceptDecline) == "<:accept:858107173799198740>": # accepted
        await msg.edit(content=f"**<:accept:858107173799198740> `{user.display_name}` accepted.**")
        await ctx.author.send(f"**You are now on call with {user.display_name}! Say something or `end` at any time to hang up!**")
        await user.send(f"**You are now on call with {ctx.author.display_name}! Say `end` at any time to hang up!**")
        endCall = False
        while endCall == False:
          ctxMsg = await client.wait_for("message",check=ctxCheck)
          if ctxMsg.content.lower() == "end":
            endCall = True
            await user.send(f"**{ctx.author.display_name} ended the call.**")
            await ctx.author.send(f"**You ended the call.**")
          else:
            await user.send(f"**{ctx.author.display_name}:** {ctxMsg.content}")

          uMsg = await client.wait_for("message",check=uCheck)
          if uMsg.content.lower() == "end":
            endCall = True
            await ctx.author.send(f"**{user.display_name} ended the call.**")
            await user.send(f"**You ended the call.**")
          else:
            await ctx.author.send(f"**{user.display_name}:** {uMsg.content}")
    except:
      await msg.edit(content=f"**❌ {user.display_name} was not reachable.**")






keep_alive()
client.run(token)
