import { GetCallerIdentityCommand, STSClient } from '@aws-sdk/client-sts';

let stsClient: STSClient;

export const getAwsAccountId = async (): Promise<string> => {
  if (!stsClient) {
    stsClient = new STSClient();
  }

  const identity = await stsClient.send(new GetCallerIdentityCommand({}));
  if (!identity?.Account) {
    throw new Error('Could not retrieve AWS Account ID');
  }
  return identity.Account;
};
