# Week 2 - Day 1 Lecture

---

## HTTP and APIs

---

### Web Server vs Web Client

- within a domain you can have multiple hosts
  - domain google.com, can could have apis, www, www2
- can have multiple servers running (http is being one)
  - **port** 80 is the default http port/ in browser don't need to specify since its default
  - https is port 433
- parameters start with a `?`
  - `=` seperates the key and the value
- many times the path would pass querys ( the server would need to support, client can't just decide)
- **DHCP Server** allocates IP addresses
- TCP
  - role 1 - take chunks of data and slice into small pieces and let the other side put it back together (because sequence would be highlighted/labelled when split)
- application layer (some type of interpretation)
  - http, images, text, scripts, video/audio - uses a protocol to send this raw data (make sense of this data, breaking it up )

### HTTP Fundamentals

- IP address needed to send the request (google.com however is not an IP address)
- **DNS** Domain Naming Service, which does the mapping to take the .com and translate it into an IP address
- (that's why it takes a long time when you make a new domain (it says hours, but really minutes, which is long in comp sci))
- DHCP,when you log in morning and wifi is connecting, talk to DHCP, connect to a gateway, get your IP address
- there's kind of 2 Ip address (the one 'used by the land') - 'when I say what's my IP address in browser - this is the DHCP IP which is connecting outside of the server'
- can I change my IP address hardwired? - it would need to be within your land, otherwise you wouldn't be able to communicate
- last part of the IP address (after last dot)... would be between 253 because
- see drawing Alex made to explain this concept (motem has your public IP, your router has the DHCP and is the one assigning an IP to your devices)

*ifconfig in terminal is where you can pass parameters to this commmand to change IPs from the command line*

### JSON

APIs call an endpoint to revtrieve a resource on a domain's API [**REQUEST**]

The API will do a lookup and respond with a representation of the resource in JSON format (typically) [**RESPONSE**]

Parameters (coming after the `?`) are **visible** as a part of the **URL**, or are passed within the message **body** which is **hidden**

- `GET` only has URL parameters

### Simple node HTTP Client (ex live coding exercise)

