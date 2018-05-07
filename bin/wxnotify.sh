#!/bin/bash
#
CropID="wx103694b1631834be"
Secret="-RwE8hIq8o5ZdCpSdBRSBARHfPPGqLsNOHeBlqrcaro"
GURL="https://qyapi.weixin.qq.com/cgi-bin/gettoken?corpid=$CropID&corpsecret=$Secret"
TokenContent=$(curl $GURL)
echo "TokenContent: ${TokenContent}"
Gtoken=`echo ${TokenContent} | awk -F"\"" '{print $10}'`
echo "token: ${Gtoken}"
PURL="https://qyapi.weixin.qq.com/cgi-bin/message/send?access_token=$Gtoken"
Content=$1
echo $Content
Message=`cat << EOF
{
  "totag": "",
  "touser": "zoei",
  "toparty": "",
  "msgtype": "text",
  "agentid": "1",
  "text": {"content": "${Content}"},
  "safe":"0"
}
EOF
`
echo "Message: ${Message}"
curl -X POST -H "Content-Type: application/json" $PURL -d "$Message"