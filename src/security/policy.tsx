interface policyProps {
  userAttributes: Record<string, any>;
  requiredPolicy: Record<string, any>;
}

export const checkPolicy = ({
  userAttributes,
  requiredPolicy,
}: policyProps) => {
  return Object.entries(requiredPolicy).every(([key, value]) => {
    if (Array.isArray(value)) {
      return value.includes(userAttributes[key]);
    }
    return userAttributes[key] === value;
  });
};
