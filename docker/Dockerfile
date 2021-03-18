FROM node:13.2.0

# supervisor
RUN apt-get update && DEBIAN_FRONTEND=noninteractive apt-get install -y \
    supervisor \
    && rm /bin/sh && ln -s /bin/bash /bin/sh \
    && rm -r /var/lib/apt/lists/*

# pm2 
RUN npm install -g pm2 && apt-get clean

# vars
ARG USERNAME
ARG DOCKER_UID
ARG DOCKER_GID
ARG NODE_ENV
ENV NODE_ENV ${NODE_ENV}

# create app user
RUN groupadd -g ${DOCKER_GID} ${USERNAME}
RUN useradd -m -u ${DOCKER_UID} -g ${DOCKER_GID} -s /bin/bash ${USERNAME}

# supervisord conf
COPY docker/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

WORKDIR /app
# dir perm
RUN chown -R ${DOCKER_UID}:${DOCKER_UID} /app
RUN chmod -R g+w /app \
    && chown -R ${USERNAME}:${USERNAME} /usr/local/bin/
    
# sudo power (without password) <- DEVELOPMENT AND PLAYGROUND ONLY
RUN usermod -a -G sudo $USERNAME && \
    echo '$USERNAME ALL=(ALL) NOPASSWD:ALL' >> /etc/sudoers

# starter script
COPY docker/start-container /usr/local/bin/start-container
RUN chmod +x /usr/local/bin/*

USER ${USERNAME}

CMD ["start-container"]